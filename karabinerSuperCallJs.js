const util = require('util')
let execSync = require('child_process').execSync
let { dirname } = require('path')
const lodash = require('lodash')

let sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))
let st = JSON.stringify
let pa = JSON.parse
let lo = console.log
function r(request){
  let pkg
  if (request.startsWith('@')) {
    pkg = request.split('/').slice(2).join('/')
  } else {
    pkg = request.split('/')[0]
  }
  if(fs.existsSync(__dirname+'/node_modules/'+pkg)){
  }else{
    execSync(`npm i ${pkg}`,
      {
        cwd: `${__dirname}`,
        stdio: [],
        timeout: 30 * 1000
      }
    )
  }
  return require(request)
}
Object.defineProperties(Promise.prototype, {
  v:{
    get(){
      return this.wait()
    }
  },
  wait:{
    value:function(){
      return wait(this)
    }
  }
})
function defineAuto(def){
  let descriptors={}
  if(Array.isArray(def)){
    def=Object.fromEntries(def.map(v=>[v,1]))
  }
  for (let [name, v] of Object.entries(def)) {
    let getter = v
    if (v === 1) {
      getter = () => require(name)
    }
    descriptors[name]= {
      get () {
        let val = getter()
        global[name] = val
        return val
      },
      set (val) {
        delete global[name]
        global[name] = val
      },
      configurable: true
    }
  }
  Object.defineProperties(global,descriptors)
}

defineAuto({
  axios(){
    let axios = require('@byted-light/axios')
    let x = axios.defaults.interceptors || axios.interceptors
    x.request.use(function interceptor (config) {
      if (config.url && !config.url.includes('://') &&
        !config.url.startsWith('/')) {
        config.url = 'http://' + config.url
        return config
      } else {
        return config
      }
    })
    return axios
  },
  wait(){
    return require('@superjs/wait')
  },
  mongodb:1,
  lodash:1,
  cp(){
    return require('child_process')
  }
})
let builtins = [
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'crypto',
  'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'http2', 'https', 'net',
  'os', 'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
  'stream', 'string_decoder', 'tls', 'trace_events', 'tty', 'url', 'util',
  'v8', 'vm', 'worker_threads', 'zlib'
]
defineAuto(builtins)

function sh(cmd,options){
  try {
    return execSync(cmd, options).toString()
  }catch (e) {
    throw new Error(e.stderr?.toString())
  }
}
let db = new Proxy(() => {}, {
  apply (target, thisArg, argArray) {
    let uri = argArray[0]|| 'mongodb://localhost/test'
    if (!uri.startsWith('mongodb')) {
      uri = 'mongodb://localhost/' + uri
    }
    const client = wait(mongodb.MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      readPreference: 'secondaryPreferred'
    }))
    let db = new Proxy(client.db(), {
      get (target, p, receiver) {
        let targetElement = target[p]
        if (targetElement) return targetElement
        return target.collection(p)
      }
    })
    return db
  },
  get (target, p, receiver) {
    return receiver()[p]
  }
})

let main = async () => {
  try {
    let require = r

    let script = process.argv[2]

    let ret = eval(script)

    ret = await ret

    if (ret != null)
      console.log(ret)
  }catch (e){
    console.error(e)
  }
  process.exit(0)
}

main()
