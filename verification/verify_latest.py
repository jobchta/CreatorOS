from playwright.sync_api import sync_playwright

def verify_latest_additions():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Login Page
        print("Visiting Login...")
        page.goto("http://localhost:3001/login")
        page.wait_for_selector("text=Sign in to LogicLoom")
        page.screenshot(path="verification/login.png", full_page=True)
        print("Login screenshot taken.")

        # 2. Signup Page
        print("Visiting Signup...")
        page.goto("http://localhost:3001/signup")
        page.wait_for_selector("text=Create your account")
        page.screenshot(path="verification/signup.png", full_page=True)
        print("Signup screenshot taken.")

        # 3. Pricing Page
        print("Visiting Pricing...")
        page.goto("http://localhost:3001/pricing")
        page.wait_for_selector("text=Invest in your business")
        page.wait_for_selector("text=Most Popular")
        page.screenshot(path="verification/pricing.png", full_page=True)
        print("Pricing screenshot taken.")

        # 4. Settings Page
        print("Visiting Settings...")
        page.goto("http://localhost:3001/dashboard/settings")
        page.wait_for_selector("text=Profile Information")
        page.wait_for_selector("text=Subscription & Billing")
        page.screenshot(path="verification/settings.png", full_page=True)
        print("Settings screenshot taken.")

        # 5. Profile Page
        print("Visiting Profile...")
        page.goto("http://localhost:3001/dashboard/profile")
        page.wait_for_selector("text=John Doe")
        page.wait_for_selector("text=Portfolio")
        page.screenshot(path="verification/profile.png", full_page=True)
        print("Profile screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_latest_additions()
