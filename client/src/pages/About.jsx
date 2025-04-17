import React from 'react';
import { Helmet } from 'react-helmet';
import logo from "../assets/logo.png";
const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Helmet>
        <title>Terms of Service - LikhoIndia</title>
        <meta
          name="description"
          content="Review our Terms of Service governing your use of LikhoIndia and its associated services."
        />
      </Helmet>

     <div>
     <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Terms of Service</h1>
      <p className="mb-4 text-sm text-gray-600">Effective Date: April 2025</p>
      </div>

      <img src={logo} alt="" className='h-12' />
     </div>

      <div className="space-y-6 text-sm leading-relaxed text-gray-700">
        {/* Section 1 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using LikhoIndia, you agree to be bound by these Terms of Service. 
            If you disagree with any part, you may not use our services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">2. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 13 years old to create an account</li>
            <li>You are responsible for maintaining account security</li>
            <li>Provide accurate and current information</li>
            <li>Immediately notify us of unauthorized account use</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">3. Content Ownership</h2>
          <p>Users retain ownership of their content but grant us:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>A worldwide, non-exclusive license to display and distribute your content</li>
            <li>The right to moderate or remove inappropriate content</li>
            <li>Permission to use anonymized content for analytical purposes</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">4. User Responsibilities</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Post illegal, harmful, or offensive content</li>
            <li>Engage in spam or unauthorized advertising</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with website security or functionality</li>
            <li>Violate intellectual property rights</li>
          </ul>
        </section>

        {/* Section 5 - Content Moderation */}
        <section>
          <h2 className="text-lg font-semibold mb-2">5. Content Moderation Policy</h2>
          <p>Administrators reserve the right to remove blogs that:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Contain false or misleading information</li>
            <li>Violate our community guidelines</li>
            <li>Are reported by multiple users as inappropriate</li>
            <li>Contain plagiarized content</li>
            <li>Promote harmful or dangerous activities</li>
          </ul>
          <p className="mt-2">
            If your blog is removed, you will receive a notification explaining the reason.
            You may appeal the decision by contacting our support team.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">6. Termination</h2>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Suspend or terminate accounts violating these terms</li>
            <li>Remove content at our discretion</li>
            <li>Discontinue service to any user without notice</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">7. Disclaimers</h2>
          <p>Our service is provided "as is" without warranties of:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Merchantability or fitness for particular purpose</li>
            <li>Accuracy or completeness of content</li>
            <li>Non-infringement of third-party rights</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">8. Limitation of Liability</h2>
          <p>We shall not be liable for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Indirect or consequential damages</li>
            <li>Loss of data or profits</li>
            <li>Third-party content or actions</li>
            <li>Service interruptions beyond our control</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">9. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. 
            Any disputes shall be resolved in Lucknow, Uttar Pradesh jurisdiction.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">10. Changes to Terms</h2>
          <p>
            We may update these terms periodically. Continued use after changes constitutes acceptance.
            We will notify users of significant changes via email or website notice.
          </p>
        </section>

        {/* Section 11 */}
        {/* <section>
          <h2 className="text-lg font-semibold mb-2">11. Contact</h2>
          <p>
            For questions about these terms:
            <br />
            Email: contact@likhoindia.com
            <br />
            Mailing Address: Kanhauli, Muftiganj, Jaunpur, UP - 222170
          </p>
        </section> */}
      </div>
    </div>
  );
};

export default TermsOfService;