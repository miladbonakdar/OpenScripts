export default {
  install(Vue) {
    const errorBus = new Vue()
    Vue.prototype.$errorBus = errorBus

    Vue.prototype.$handleError = (err, after) => {
      if (err.status === 500) {
        let message = 'Please try again later!'
        if (err.body && typeof err.body === 'string') message = err.body
        if (
          err.body &&
          err.body.message &&
          typeof err.body.message === 'string'
        )
          message = err.body.message
        errorBus.$emit('internal-server', message)
        if (after) after()
        return
      }
      if (err.status === 400) {
        let message = 'Bad request!'
        if (err.body && err.body.message) message = err.body.message
        errorBus.$emit('bad-request', message)
        console.log(err)
        if (after) after()
        return
      }
      if (err.status === 403) {
        let message = 'Access Denied!'
        if (err.body && typeof err.body === 'string') message = err.body
        errorBus.$emit('access-denied', message)
        console.log(err)
        if (after) after()
        return
      }

      if (err.status === 404) {
        let message = 'Not Found!'
        if (err.body && typeof err.body === 'string') message = err.body
        if (err.body && err.body.message) message = err.body.message
        errorBus.$emit('internal-server', message)
        console.log(err)
        if (after) after()
        return
      }
    }

    Vue.prototype.$logError = (err, after) => {
      if (err.status === 500) {
        let message = 'Please try again later!'
        if (err.body && typeof err.body === 'string') message = err.body
        console.log(message, err)
        if (after) after()
        return
      }
      if (err.status === 400) {
        let message = 'Bad request!'
        if (err.body && err.body.message) message = err.body.message
        console.log(message, err)
        if (after) after()
        return
      }
      if (err.status === 403) {
        let message = 'Access denied!'
        if (err.body && typeof err.body === 'string') message = err.body
        console.log(message, err)
        if (after) after()
        return
      }
    }
  }
}
