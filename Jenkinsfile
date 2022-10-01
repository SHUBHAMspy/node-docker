pipeline {
    agent { dockerfile true }
    environment {
        HOME = "${env.WORKSPACE}"
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                node -v
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                echo "doing test stuff..
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}