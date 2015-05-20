moment = require('moment-timezone')

module.exports = (robot) ->

  robot.respond /time/i, (res) ->
    res.send "#{moment().tz('Australia/Melbourne').format('ddd do MMM YYYY, HH:mm')} - Melbourne"
    res.send "#{moment().tz('America/Tegucigalpa').format('ddd do MMM YYYY, HH:mm')} - Honduras"
    res.send "#{moment().tz('America/Chicago').format('ddd do MMM YYYY, HH:mm')} - Nashville"
    res.send "#{moment().tz('Asia/Kolkata').format('ddd do MMM YYYY, HH:mm')} - India"

  robot.respond /stock/i, (res) ->
      res.http('http://www.google.com/finance/info?q=ASX:RXH')
        .get() (err, _res, body) ->
          result = JSON.parse(body.replace(/\/\/ /, ''))
          res.send "http://chart.finance.yahoo.com/z?s=RXH.AX&t=7d&q=l&l=on&z=l&a=v&p=s&lang=en-US&region=US#.png"
          res.send result[0].l_cur + "(#{result[0].c})"
