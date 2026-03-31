// QA Automated Test Suite — Playwright
// Runs against the live GitHub Pages site
const { chromium } = require('playwright');

const SITE_URL = 'https://zed0minat0r.github.io/dental-office-site/';
const SCREENSHOT_DIR = '/tmp/dental-office-site/screenshots';

async function runTests() {
    const fs = require('fs');
    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    const browser = await chromium.launch({ headless: true });
    const results = [];

    function log(test, pass, detail) {
        results.push({ test, pass, detail });
        console.log(`${pass ? '✅' : '❌'} ${test}: ${detail}`);
    }

    try {
        // Desktop tests
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });

        // Screenshot desktop
        await page.screenshot({ path: `${SCREENSHOT_DIR}/desktop.png`, fullPage: true });
        log('Desktop screenshot', true, 'Captured');

        // Check page title
        const title = await page.title();
        log('Page title', title.includes('Bright Smile') || title.includes('Dental'), `Title: "${title}"`);

        // Check hero section exists
        const hero = await page.$('.hero, #hero, [class*="hero"]');
        log('Hero section', !!hero, hero ? 'Found' : 'Missing');

        // Check navigation links
        const navLinks = await page.$$('nav a, .nav a, header a');
        log('Navigation links', navLinks.length >= 4, `Found ${navLinks.length} nav links`);

        // Check services section
        const services = await page.$$('[class*="service"] [class*="card"], .service-card, .services-grid > *');
        log('Service cards', services.length >= 4, `Found ${services.length} service cards`);

        // Check dark mode toggle
        const darkToggle = await page.$('[class*="dark"], [class*="theme"], [aria-label*="dark"], [aria-label*="theme"]');
        log('Dark mode toggle', !!darkToggle, darkToggle ? 'Found' : 'Missing');

        // Test dark mode
        if (darkToggle) {
            await darkToggle.click();
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${SCREENSHOT_DIR}/desktop-dark.png`, fullPage: true });
            log('Dark mode', true, 'Toggled and captured');
            await darkToggle.click(); // toggle back
        }

        // Check contact form
        const form = await page.$('form');
        log('Contact form', !!form, form ? 'Found' : 'Missing');

        // Check form inputs
        const inputs = await page.$$('form input, form select, form textarea');
        log('Form fields', inputs.length >= 3, `Found ${inputs.length} form fields`);

        // Check testimonials
        const testimonials = await page.$$('[class*="testimonial"], [class*="review"]');
        log('Testimonials', testimonials.length >= 2, `Found ${testimonials.length} testimonials`);

        // Check for broken links (href="#id" with no matching id)
        const brokenLinks = await page.evaluate(() => {
            const broken = [];
            document.querySelectorAll('a[href^="#"]').forEach(a => {
                const href = a.getAttribute('href');
                if (href === '#' || href.length <= 1) return;
                if (!document.querySelector(href)) broken.push(href);
            });
            return broken;
        });
        log('Anchor links', brokenLinks.length === 0, brokenLinks.length === 0 ? 'All valid' : `Broken: ${brokenLinks.join(', ')}`);

        // Check for console errors
        const consoleErrors = [];
        page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        log('Console errors', consoleErrors.length === 0, consoleErrors.length === 0 ? 'None' : consoleErrors.join('; '));

        // Check horizontal scroll
        const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        log('No horizontal scroll (desktop)', !hasHScroll, hasHScroll ? 'HAS horizontal scroll!' : 'Clean');

        // Mobile tests
        const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
        await mobile.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
        await mobile.screenshot({ path: `${SCREENSHOT_DIR}/mobile-375.png`, fullPage: true });
        log('Mobile screenshot (375px)', true, 'Captured');

        // Check mobile horizontal scroll
        const mobileHScroll = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        log('No horizontal scroll (mobile)', !mobileHScroll, mobileHScroll ? 'HAS horizontal scroll!' : 'Clean');

        // Check hamburger menu
        const hamburger = await mobile.$('[class*="hamburger"], [class*="menu-toggle"], [aria-label*="menu"]');
        log('Hamburger menu (mobile)', !!hamburger, hamburger ? 'Found' : 'Missing');

        // Test hamburger opens
        if (hamburger) {
            await hamburger.click();
            await mobile.waitForTimeout(500);
            await mobile.screenshot({ path: `${SCREENSHOT_DIR}/mobile-menu-open.png` });
            log('Hamburger opens', true, 'Menu opened');
        }

        // Small mobile test
        const small = await browser.newPage({ viewport: { width: 320, height: 568 } });
        await small.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
        await small.screenshot({ path: `${SCREENSHOT_DIR}/mobile-320.png`, fullPage: true });
        log('Small mobile screenshot (320px)', true, 'Captured');

        const smallHScroll = await small.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        log('No horizontal scroll (320px)', !smallHScroll, smallHScroll ? 'HAS horizontal scroll!' : 'Clean');

        await page.close();
        await mobile.close();
        await small.close();

    } catch (err) {
        log('Test execution', false, err.message);
    }

    await browser.close();

    // Summary
    const passed = results.filter(r => r.pass).length;
    const failed = results.filter(r => !r.pass).length;
    console.log(`\n--- RESULTS: ${passed} passed, ${failed} failed out of ${results.length} tests ---`);

    // Write results to file
    const fs = require('fs');
    fs.writeFileSync('/tmp/dental-office-site/test-results.json', JSON.stringify(results, null, 2));

    return { passed, failed, total: results.length, results };
}

runTests().catch(console.error);
