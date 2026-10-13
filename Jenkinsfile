// Runs the Playwright suite (Checkout, Login, Products) against saucedemo.
// Assumes a Linux/Mac agent with Node 20+ and the JUnit plugin (bundled with
// most Jenkins installs). On a Windows agent replace sh with bat.
pipeline {
  agent any

  environment {
    CI = 'true'   // switches the config to headless, 5 workers, 1 retry
  }

  triggers {
    // Run every 5 minutes. H lets Jenkins pick the exact minute to spread load.
    cron('H/5 * * * *')
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
        // Failed tests shouldn't stop the pipeline here: the junit step in
        // post marks the build UNSTABLE (yellow) instead of FAILED (red).
        // Red is kept for real breakage, like npm ci failing or no report.
        sh 'npx playwright test || true'
      }
    }
  }

  post {
    always {
      script {
        def r = junit testResults: 'reports/junit.xml'
        currentBuild.description = "${r.passCount} passed, ${r.failCount} failed, ${r.skipCount} skipped"
      }
      // Allure dashboard with history and trend chart (Allure Jenkins plugin,
      // Allure 3 CLI on the agent's PATH)
      allure allureVersion: '3', results: [[path: 'allure-results']]
      publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html',
                           reportName: 'Playwright Report', keepAll: true,
                           alwaysLinkToLastBuild: true, allowMissing: true])
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
    }
  }
}
