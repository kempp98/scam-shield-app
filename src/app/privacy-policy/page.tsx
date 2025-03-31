// src/pages/privacy-policy.tsx
// **IMPORTANT:** This is an UPDATED GENERIC TEMPLATE based on limited user input.
// It includes standard clauses for automatic data collection and third-party sharing
// that YOU MUST VERIFY AND CUSTOMIZE based on your actual website setup and tools used.
// It STILL requires adding the Data Controller identity and STRONGLY recommends legal review
// to ensure full compliance.

import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  // Get the current year dynamically for the copyright or last updated date
  //const currentYear = new Date().getFullYear();
  // ** ACTION REQUIRED: Update this date whenever you materially change the policy **
  const lastUpdatedDate = "March 31, 2025";

  const contactEmail = "scamsafeapp@gmail.com"; // Your provided contact email

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last Updated:</strong> {lastUpdatedDate}
      </p>

      <p>
        Welcome to our website (the &quot;Service&quot;). We are committed to protecting your personal
        information and your right to privacy. This Privacy Policy explains how we collect,
        store, use, and share your information when you use our Service.
      </p>
      <p>
        By using the Service, you agree to the collection and use of information in accordance
        with this policy. If you have any questions or concerns about this policy or our practices
        regarding your personal information, please contact us at {contactEmail}.
      </p>
        <p>
            <strong>Data Controller</strong>
            <br />
             This Service is operated by ScamSafe.
             <br/>
        </p>



      <h2>Information We Collect</h2>
      <p>We collect information in the following ways:</p>

      <h3>Information You Provide to Us</h3>
        <p>
            When you sign up for our newsletters or platform updates through signup forms on our Service,
            we collect the personal information you voluntarily provide to us. Currently, this includes:
        </p>
        <ul>
            <li><strong>Email address</strong></li>
            {/* Add any other info you actively collect, e.g., Name, if applicable */}
        </ul>

      <h3>Information Automatically Collected (Usage Data)</h3>
      <p>
        When you access and use the Service, we may automatically collect certain information about your device and interaction with our Service (&quot;Usage Data&quot;).
        This information does not reveal your specific identity but may include:
      </p>
       <ul>
            <li>Internet Protocol (IP) address</li>
            <li>Browser type and version</li>
            <li>Device characteristics and operating system</li>
            <li>Referring URLs</li>
            <li>Pages visited on our Service</li>
            <li>Dates and times of visits</li>
            <li>Time spent on pages</li>
            <li>Other technical information related to your interaction with the Service</li>
       </ul>
       <p>This information is primarily needed to maintain the security and operation of our Service, for troubleshooting, and potentially for internal analytics purposes.</p>


      <h3>Tracking Technologies and Cookies</h3>
      <p>
        We may use cookies and similar tracking technologies (like web beacons or pixels) to track activity on our Service and store certain information. Cookies are small data files stored on your device. We may use essential cookies required for the operation of the Service. We may also use cookies for performance or analytics purposes.
        {/* Example if using Google Analytics: "We use Google Analytics, which uses cookies to help us analyze how users use the site." */}
        You can manage your cookie preferences through your browser settings. However, disabling certain cookies may affect the functionality of the Service.
      </p>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>
          <strong>To send you communications you requested:</strong> We use the email address you provide to send you:
             <ul>
                <li>Newsletters</li>
                <li>Updates about our platform</li>
             </ul>
             You provide consent for this when you sign up via our forms. You can withdraw this consent at any time by unsubscribing.
        </li>
        <li>
          <strong>To provide, operate, and maintain our Service:</strong> Using automatically collected Usage Data helps ensure the Service works correctly, remains secure, and allows us to troubleshoot issues.
        </li>
         <li>
          <strong>To monitor and analyze usage:</strong> To understand how our Service is used and identify trends to improve user experience (typically using Usage Data). {/* [Remove or adjust if you don't do analytics] */}
        </li>
         <li>
          <strong>To detect, prevent, and address technical issues.</strong>
        </li>
      </ul>

      <h2>How We Share Your Information</h2>
      <p>We do not sell your Personal Data.</p>
      <p>We may share your information with third-party service providers who perform services for us or on our behalf and require access to such information to do that work. These include:</p>
       <ul>
             <li>
                <strong>Email Delivery Services:</strong> To send the newsletters and updates you requested.
                <br/><em>Google Workspace/Gmail</em>
            </li>
             <li>
                <strong>Website Hosting Provider:</strong> Our website is hosted by a third-party provider who may have access to server logs containing Usage Data.
                 <br/><em>Vercel</em>
            </li>
            <li>
                 <strong>Data Analytics Providers:</strong>
                 <br/><em>Google Analytics</em>
            </li>
            {/* Add any other categories if applicable (e.g., security tools, CDNs) */}
       </ul>
      <p>These service providers are contractually obligated to protect your data and use it only for the purposes we specify.</p>
      <p>We may also disclose your information under the following circumstances:</p>
      <ul>
        <li>
          <strong>Business Transfers:</strong> In connection with any merger, sale of assets, financing, or acquisition of all or a portion of our business.
        </li>
        <li>
          <strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities (e.g., a court or government agency).
        </li>
      </ul>


      <h2>Data Security</h2>
      <p>
        We implement reasonable technical and organizational security measures designed to protect the security of the personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain the email addresses collected for newsletters and platform updates for as long as you remain subscribed. You can unsubscribe at any time using the link provided in our emails. Upon unsubscribing, we will take steps to remove your email address from our active mailing lists promptly, subject to any necessary retention for legal or backup purposes.
      </p>
        <p>
        Usage Data is generally retained for shorter periods, except when this data is used to strengthen the security or improve the functionality of our Service, or we are legally obligated to retain this data for longer periods.
         {/* [Adjust if you have specific retention policies for logs/analytics] */}
        </p>


      <h2>Your Data Protection Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your personal data under laws like the GDPR (for users in the EEA/UK) or CCPA/CPRA (for users in California). These rights may include:
      </p>
        <ul>
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right to rectification if information is inaccurate or incomplete.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right to request that we restrict the processing of your personal data.</li>
            <li>The right to data portability (receive a copy of your data in a usable format).</li>
            <li>The right to withdraw consent at any time where we relied on your consent to process your information (like unsubscribing from emails).</li>
             <li>The right to opt-out of the &quot;sale&quot; or &quot;sharing&quot; of personal information (as defined under CCPA/CPRA - note we stated we do not sell data).</li>
            <li>The right not to be discriminated against for exercising your privacy rights.</li>
        </ul>
      <p>
        To exercise any of these rights, or if you have questions about your data, please contact us at: <strong>{contactEmail}</strong>.
      </p>
      <p>
        You can opt-out of receiving marketing communications (newsletters, updates) from us at any time by clicking the &quot;unsubscribe&quot; link in the emails we send.
      </p>
      <p>We will respond to your requests in accordance with applicable data protection laws. We may need to verify your identity before processing certain requests.</p>
      <p>If you are located in the EEA, UK, or California, you may also have the right to complain to a data protection authority about our collection and use of your personal data.</p>


      <h2>Children&quot;s Privacy</h2>
      <p>
        Our Service is not intended for use by children under the age of 13 [Consider 16 depending on target audience and specific legal advice], and we do not knowingly collect personally identifiable information from children under this age. If you become aware that a child has provided us with Personal Data without parental consent, please contact us at {contactEmail}. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information.
      </p>

      <h2>International Data Transfers</h2>
        <p>
            Our Service is operated in the United States. If you are accessing the Service from outside the United States, please be aware that your information, including your email address and any Usage Data, will be transferred to, stored, and processed in the United States, where our servers are located and our central database is operated. Data protection laws in the U.S. may differ from those in your jurisdiction.
        </p>

      <h2>Links to Other Sites</h2>
      <p>
        Our Service may contain links to other websites that are not operated by us. If you click a third-party link, you will be directed to that site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top. We may also notify subscribed users via email if the changes are significant. {/* [Adjust notification method if needed] */}
      </p>
      <p>
        You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, how we handle your data, or wish to exercise your data protection rights, please contact us:
      </p>
      <p>
        By email: <strong>{contactEmail}</strong>
      </p>


      <hr style={{ margin: '30px 0' }} />
       <p style={{ fontSize: '0.8em', color: '#555' }}>
          This Privacy Policy requires verification of actual data practices, identification of the Data Controller, and listing of specific third-party service providers to be fully accurate and compliant. Professional legal review is advised.
       </p>
    </div>
  );
};

export default PrivacyPolicyPage;