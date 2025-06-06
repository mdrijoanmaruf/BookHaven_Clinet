import React from 'react'
import { Link } from 'react-router-dom'

const TermsConditions = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-primary-dark mb-6">Terms and Conditions</h1>
          <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">1. Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                These Terms and Conditions constitute a legally binding agreement made between you and BookHaven, concerning your access to and use of our website and library management services.
              </p>
              <p className="text-gray-600">
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">2. Membership and Accounts</h2>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">2.1 Account Creation</h3>
              <p className="text-gray-600 mb-4">
                To access certain features of our services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">2.2 Account Responsibilities</h3>
              <p className="text-gray-600 mb-4">
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account.
              </p>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">2.3 Account Termination</h3>
              <p className="text-gray-600">
                We reserve the right to terminate or suspend your account and refuse any and all current or future use of our services for any reason at any time. Upon termination, your right to use the services will immediately cease.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">3. Library Services</h2>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">3.1 Borrowing Books</h3>
              <p className="text-gray-600 mb-4">
                Members may borrow up to 5 books at a time for a period of 14 days. Members must return borrowed books by the due date or renew them if no one else has requested the book.
              </p>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">3.2 Late Fees</h3>
              <p className="text-gray-600 mb-4">
                Late fees of ৳50 per day will be charged for each overdue book. Accumulated late fees must be paid before borrowing additional books.
              </p>
              
              <h3 className="text-lg font-medium text-primary-dark mb-2">3.3 Book Damage or Loss</h3>
              <p className="text-gray-600">
                Members are responsible for any damage to or loss of borrowed books. In such cases, members must pay the replacement cost of the book plus a processing fee.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">4. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the property of BookHaven or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-600">
                You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our services without written permission.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">5. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">
                You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To impersonate or attempt to impersonate BookHaven, a BookHaven employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the services, or which may harm BookHaven or users of the services</li>
                <li>To use the services in any manner that could disable, overburden, damage, or impair the site</li>
                <li>To use any robot, spider, or other automatic device to access the services for any purpose</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">6. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4">
                Your use of our services is at your sole risk. The services are provided on an "AS IS" and "AS AVAILABLE" basis. BookHaven expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="text-gray-600">
                BookHaven makes no warranty that the services will meet your requirements, be available on an uninterrupted, timely, secure, or error-free basis, or be accurate, reliable, complete, legal, or safe.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by applicable law, in no event shall BookHaven be liable for any direct, indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, that result from the use of, or inability to use, the services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">8. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms at any time. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">9. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-dark mb-3">10. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
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
            <Link to="/legal/privacy-policy" className="text-primary hover:text-accent transition-colors">
              ← Privacy Policy
            </Link>
            <Link to="/" className="text-primary hover:text-accent transition-colors">
              Back to Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions 