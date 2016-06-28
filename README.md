# Serverless: electron updater

Building a simple [lambda](https://aws.amazon.com/lambda/) based electron updater
using the [serverless](http://docs.serverless.com/) framework. Inspired by the [Squirrel Updates Server project](https://github.com/Aluxian/squirrel-updates-server)

API draft:
* /
  * [GET]()
  * /update
    * [GET](https://d64zd4cq1e.execute-api.us-east-1.amazonaws.com/dev/update)
    * /{platform}
      * [GET](https://d64zd4cq1e.execute-api.us-east-1.amazonaws.com/dev/update/{platform})
  * /download
    * /{platform}
      * latest
        * [GET]()

NB: valid values for {platform} are `darwin`/`win32`/`linux`
