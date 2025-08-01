import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Your Data Protection | BookHaven</title>
        <meta name="description" content="Learn how BookHaven protects your privacy and handles your personal data. Read our comprehensive privacy policy." />
      </Helmet>
      <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-primary-dark mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                BookHaven ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our library management services.
              </p>
              <p className="text-gray-600">
                Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">2.1 Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We may collect personally identifiable information, such as:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1 mb-4">
                <li>Name, email address, and contact information</li>
                <li>Username and password</li>
                <li>Borrowing and reading history</li>
                <li>Payment information (if applicable)</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">2.2 Non-Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We may also collect non-personal information about how you interact with our services, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>To provide, maintain, and improve our services</li>
                <li>To create and manage your account</li>
                <li>To process transactions and send related information</li>
                <li>To send administrative information, such as updates, security alerts, and support messages</li>
                <li>To respond to your comments, questions, and requests</li>
                <li>To send you marketing and promotional communications (with your consent)</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To protect our services and users from fraudulent, unauthorized, or illegal activity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">4. Cookies and Similar Technologies</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to maintain the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">6. Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                Our services may contain links to third-party websites, services, or advertisements. We are not responsible for the privacy practices, content, or policies of these third parties. We encourage you to read the privacy policies of every website you visit.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">7. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">9. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md text-gray-600">
                <p className="mb-1">BookHaven</p>
                <p className="mb-1">Level 4, Block D, Jamuna Future Park</p>
                <p className="mb-1">Bashundhara, Dhaka 1229, Bangladesh</p>
                <p className="mb-1">Email: <a href="mailto:info@bookhaven.com" className="text-primary hover:underline">info@bookhaven.com</a></p>
                <p>Phone: +880 1712-345678</p>
              </div>
            </section>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between">
            <Link to="/" className="text-primary hover:text-accent transition-colors">
              ← Back to Home
            </Link>
            <Link to="/legal/terms-conditions" className="text-primary hover:text-accent transition-colors">
              Terms & Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PrivacyPolicy 