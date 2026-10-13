// Runs the Playwright suite (Checkout, Login, Products) against saucedemo.
// Assumes a Linux/Mac agent with Node 20+ and the JUnit plugin (bundled with
// most Jenkins installs). On a Windows agent replace sh with bat.
pipeline {
  agent any

  environment {
    CI = 'true'   // switches the config to headless, 5 workers, 1 retry
  }

  options {
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      junit testResults: 'reports/junit.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**, reports/**', allowEmptyArchive: true
      // With the HTML Publisher plugin installed, uncomment to get a report link on the build page:
      // publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html',
      //                      reportName: 'Playwright Report', keepAll: true, alwaysLinkToLastBuild: true])
    }
  }
}
