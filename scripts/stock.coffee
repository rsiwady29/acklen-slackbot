module.exports = (robot) ->
      robot.respond /stock/i, (res) ->
            res.http('http://www.google.com/finance/info?q=ASX:RXH')
            .get() (err, _res, body) ->
              result = JSON.parse(body.replace(/\/\/ /, ''))
              res.send "http://chart.finance.yahoo.com/z?s=RXH.AX&t=7d&q=l&l=on&z=l&a=v&p=s&lang=en-US&region=US#.png"
              res.send result[0].l_cur + "(#{result[0].c})"
