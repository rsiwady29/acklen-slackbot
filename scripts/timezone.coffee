moment = require('moment-timezone')

module.exports = (robot) ->

  robot.respond /time/i, (res) ->
    res.send "#{moment().tz('Australia/Melbourne').format('ddd do MMM YYYY, HH:mm')} - Melbourne"
    res.send "#{moment().tz('America/Tegucigalpa').format('ddd do MMM YYYY, HH:mm')} - Honduras"
    res.send "#{moment().tz('America/Chicago').format('ddd do MMM YYYY, HH:mm')} - Nashville"
    res.send "#{moment().tz('Asia/Kolkata').format('ddd do MMM YYYY, HH:mm')} - India"
