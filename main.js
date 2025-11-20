// Main JavaScript for QA Automation Portfolio
class PortfolioApp {
    constructor() {
        this.testExecution = {
            isRunning: false,
            testsCompleted: 0,
            totalTests: 0,
            passed: 0,
            failed: 0,
            startTime: null
        };
        
        this.init();
    }
    
    init() {
        this.initMatrixBackground();
        this.initTypedText();
        this.initScrollAnimations();
        this.initCharts();
        this.initMobileMenu();
        this.initSmoothScrolling();
    }
    
    // Matrix Background Animation
    initMatrixBackground() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        
        new p5((p) => {
            let drops = [];
            const chars = '01TESTAUTOMATIONQAFRAMEWORKCICDAPISELENIUMCYPRESSKATALON';
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('matrix-canvas');
                
                const columns = p.width / 14;
                for (let i = 0; i < columns; i++) {
                    drops[i] = Math.random() * p.height;
                }
            };
            
            p.draw = () => {
                p.background(10, 14, 26, 25);
                p.textFont('JetBrains Mono');
                p.textSize(14);
                
                for (let i = 0; i < drops.length; i++) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    const brightness = Math.random() * 100 + 155;
                    
                    p.fill(0, 255, 65, brightness);
                    p.text(char, i * 14, drops[i]);
                    
                    if (drops[i] > p.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i] += 14;
                }
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }
    
    // Typed Text Animation
    initTypedText() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;
        
        new Typed('#typed-text', {
            strings: [
                'npx cypress run --spec "cypress/integration/**"',
                'katalon -projectPath="./automation" -testSuite="Regression"',
                'pytest tests/api/ --html=report.html',
                'newman run api-collection.json -e environment.json',
                'jmeter -n -t performance-test.jmx -l results.jtl'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize Charts
    initCharts() {
        this.initMetricsChart();
        this.initPipelineChart();
    }
    
    initMetricsChart() {
        const chartElement = document.getElementById('metrics-chart');
        if (!chartElement) return;
        
        const chart = echarts.init(chartElement);
        
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Response Time', 'Throughput', 'Error Rate', 'Coverage', 'Stability'],
                axisLine: { lineStyle: { color: '#00ff41' } },
                axisLabel: { color: '#ecf0f1' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#00ff41' } },
                axisLabel: { color: '#ecf0f1' },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
            },
            series: [{
                data: [95, 87, 3, 92, 98],
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00ff41' },
                        { offset: 1, color: '#3742fa' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#ffa500' },
                            { offset: 1, color: '#00ff41' }
                        ])
                    }
                }
            }]
        };
        
        chart.setOption(option);
        
        // Animate chart on load
        setTimeout(() => {
            chart.setOption({
                series: [{
                    data: [95, 87, 3, 92, 98],
                    animationDuration: 2000,
                    animationEasing: 'cubicOut'
                }]
            });
        }, 500);
    }
    
    initPipelineChart() {
        const chartElement = document.getElementById('pipeline-chart');
        if (!chartElement) return;
        
        const chart = echarts.init(chartElement);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(44, 62, 80, 0.9)',
                borderColor: '#00ff41',
                textStyle: { color: '#ecf0f1' }
            },
            series: [{
                type: 'sankey',
                data: [
                    { name: 'Code Commit' },
                    { name: 'Build' },
                    { name: 'Unit Tests' },
                    { name: 'Integration Tests' },
                    { name: 'API Tests' },
                    { name: 'UI Tests' },
                    { name: 'Performance Tests' },
                    { name: 'Security Scan' },
                    { name: 'Deploy Staging' },
                    { name: 'Deploy Production' }
                ],
                links: [
                    { source: 'Code Commit', target: 'Build', value: 100 },
                    { source: 'Build', target: 'Unit Tests', value: 30 },
                    { source: 'Build', target: 'Integration Tests', value: 25 },
                    { source: 'Build', target: 'API Tests', value: 20 },
                    { source: 'Build', target: 'UI Tests', value: 15 },
                    { source: 'Build', target: 'Performance Tests', value: 10 },
                    { source: 'Unit Tests', target: 'Security Scan', value: 30 },
                    { source: 'Integration Tests', target: 'Security Scan', value: 25 },
                    { source: 'API Tests', target: 'Security Scan', value: 20 },
                    { source: 'UI Tests', target: 'Security Scan', value: 15 },
                    { source: 'Performance Tests', target: 'Security Scan', value: 10 },
                    { source: 'Security Scan', target: 'Deploy Staging', value: 80 },
                    { source: 'Deploy Staging', target: 'Deploy Production', value: 60 }
                ],
                itemStyle: {
                    color: function(params) {
                        const colors = ['#00ff41', '#3742fa', '#ffa500', '#ff4757'];
                        return colors[params.dataIndex % colors.length];
                    }
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.5,
                    opacity: 0.6
                },
                label: {
                    color: '#ecf0f1',
                    fontFamily: 'JetBrains Mono'
                }
            }]
        };
        
        chart.setOption(option);
    }
    
    // Test Execution Functions
    executeTests() {
        if (this.testExecution.isRunning) return;
        
        const testSuite = document.getElementById('test-suite').value;
        const environment = document.getElementById('environment').value;
        const browser = document.getElementById('browser').value;
        
        this.testExecution = {
            isRunning: true,
            testsCompleted: 0,
            totalTests: this.getTestCount(testSuite),
            passed: 0,
            failed: 0,
            startTime: Date.now()
        };
        
        this.updateTestLog(`Starting ${testSuite} tests on ${environment} with ${browser}...`);
        this.runTestSuite();
    }
    
    getTestCount(suite) {
        const counts = {
            regression: 150,
            smoke: 25,
            api: 75,
            performance: 30
        };
        return counts[suite] || 50;
    }
    
    runTestSuite() {
        if (!this.testExecution.isRunning) return;
        
        const progress = (this.testExecution.testsCompleted / this.testExecution.totalTests) * 100;
        
        // Update progress bar
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('overall-progress');
        if (progressBar && progressText) {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
        
        // Simulate test execution
        if (this.testExecution.testsCompleted < this.testExecution.totalTests) {
            setTimeout(() => {
                this.executeSingleTest();
                this.runTestSuite();
            }, Math.random() * 200 + 100);
        } else {
            this.completeTestExecution();
        }
    }
    
    executeSingleTest() {
        const testNames = [
            'test_login_functionality',
            'test_api_authentication',
            'test_database_connection',
            'test_ui_elements_render',
            'test_form_validation',
            'test_performance_benchmark',
            'test_security_vulnerabilities',
            'test_cross_browser_compatibility',
            'test_mobile_responsiveness',
            'test_data_integrity'
        ];
        
        const testName = testNames[Math.floor(Math.random() * testNames.length)];
        const isPassed = Math.random() > 0.1; // 90% pass rate
        
        if (isPassed) {
            this.testExecution.passed++;
            this.updateTestLog(`✓ ${testName} - PASSED`, 'passed');
        } else {
            this.testExecution.failed++;
            this.updateTestLog(`✗ ${testName} - FAILED`, 'failed');
        }
        
        this.testExecution.testsCompleted++;
        this.updateMetrics();
    }
    
    updateTestLog(message, status = 'info') {
        const logElement = document.getElementById('test-log');
        if (!logElement) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `test-status-${status}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        
        logElement.appendChild(logEntry);
        logElement.scrollTop = logElement.scrollHeight;
        
        // Keep only last 20 entries
        while (logElement.children.length > 20) {
            logElement.removeChild(logElement.firstChild);
        }
    }
    
    updateMetrics() {
        const passedElement = document.getElementById('tests-passed');
        const failedElement = document.getElementById('tests-failed');
        const executionTimeElement = document.getElementById('execution-time');
        const avgResponseElement = document.getElementById('avg-response');
        const coverageElement = document.getElementById('coverage');
        
        if (passedElement) passedElement.textContent = this.testExecution.passed;
        if (failedElement) failedElement.textContent = this.testExecution.failed;
        
        if (executionTimeElement && this.testExecution.startTime) {
            const elapsed = Math.round((Date.now() - this.testExecution.startTime) / 1000);
            executionTimeElement.textContent = `${elapsed}s`;
        }
        
        if (avgResponseElement) {
            const avgResponse = Math.floor(Math.random() * 200 + 50);
            avgResponseElement.textContent = `${avgResponse}ms`;
        }
        
        if (coverageElement) {
            const coverage = Math.round((this.testExecution.passed / this.testExecution.testsCompleted) * 100);
            coverageElement.textContent = `${coverage}%`;
        }
    }
    
    completeTestExecution() {
        this.testExecution.isRunning = false;
        const totalTime = Math.round((Date.now() - this.testExecution.startTime) / 1000);
        
        this.updateTestLog(`Test execution completed in ${totalTime}s`);
        this.updateTestLog(`Total: ${this.testExecution.testsCompleted}, Passed: ${this.testExecution.passed}, Failed: ${this.testExecution.failed}`);
        
        // Show completion animation
        anime({
            targets: '#progress-bar',
            width: '100%',
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        // Reset for next run
        setTimeout(() => {
            this.resetTestExecution();
        }, 3000);
    }
    
    resetTestExecution() {
        this.testExecution = {
            isRunning: false,
            testsCompleted: 0,
            totalTests: 0,
            passed: 0,
            failed: 0,
            startTime: null
        };
        
        // Reset UI
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('overall-progress');
        if (progressBar && progressText) {
            progressBar.style.width = '0%';
            progressText.textContent = '0%';
        }
        
        const passedElement = document.getElementById('tests-passed');
        const failedElement = document.getElementById('tests-failed');
        if (passedElement) passedElement.textContent = '0';
        if (failedElement) failedElement.textContent = '0';
    }
    
    // Mobile Menu
    initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (!menuBtn) return;
        
        menuBtn.addEventListener('click', () => {
            // Toggle mobile menu (implement if needed)
            console.log('Mobile menu toggled');
        });
    }
    
    // Smooth Scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Global Functions
function startTestExecution() {
    document.getElementById('execute-tests').click();
}

function executeTests() {
    if (window.portfolioApp) {
        window.portfolioApp.executeTests();
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString();
}

function animateCounter(element, start, end, duration = 2000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, animateCounter, debounce };
}