import Vue from 'vue'
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

Amplify.configure({
    ...awsExports,
    aws_appsync_authenticationType: "API_KEY"
  })


Vue.use(Amplify)


