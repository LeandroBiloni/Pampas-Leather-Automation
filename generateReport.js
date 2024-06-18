const fs = require('fs-extra');
const { exec } = require('child_process');

const allureResultsDir = 'allure-results';
const allureReportDir = 'allure-report';
const historyDir = `${allureResultsDir}/history`;

// Function to generate allure report
const generateAllureReport = () => {
    console.log('Generating Allure report...');
    exec('npx allure generate --clean', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating report: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
        moveHistory();
    });
};

// Function to move history folder
const moveHistory = () => {
    console.log('Moving history folder...');
    const sourceDir = `${allureReportDir}/history`;
    fs.pathExists(sourceDir)
        .then(exists => {
            if (exists) {
                fs.move(sourceDir, historyDir, { overwrite: true })
                    .then(() => {
                        console.log('History folder moved successfully.');
                        serveAllureReport();
                    })
                    .catch(err => {
                        console.error(`Error moving history folder: ${err}`);
                    });
            } else {
                console.log('No history folder found to move.');
                serveAllureReport();
            }
        })
        .catch(err => {
            console.error(`Error checking history folder existence: ${err}`);
        });
};

// Function to serve allure report
const serveAllureReport = () => {
    console.log('Serving Allure report...');
    exec('npx allure serve', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error serving report: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
};

// Start the process
generateAllureReport();
