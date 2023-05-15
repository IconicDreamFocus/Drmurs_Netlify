import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const container = "col-12 py-4 px-3 px-md-5";
const para = "mx-2 mx-md-4 mx-xl-5";
const subtitle = "fw-bold";
const title = "fw-bold text-center text-uppercase ";
const card = "bg-f3 py-4 mt-3 mb-5 px-2 px-md-4 li-y-shadow br-10";
const heading =
  "h2 mx-auto text-center fw-bold bg-f3 py-2 mb-3 px-5 li-y-shadow br-10";

export default function Terms() {
  const history = useHistory();
  return (
    <div className={container}>
      <div className="d-flex">
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 cursor-pointer"
          sx={{ fontSize: 30 }}
          onClick={() => history.goBack()}
        />
        <div className={heading}>Terms of Use</div>
      </div>
      <div className={card}>
        <p className={para}>Welcome to Zillion Dreamz!</p>
        <p className={para}>
          These Terms of Use (or "Terms") govern your use of Zillion Dreamz,
          except where we expressly state that separate terms (and not these)
          apply, and provide information about the Zillion Dreamz Service (the
          "Service"), outlined below. When you create a Zillion Dreamz account
          or use Zillion Dreamz, you agree to these Terms.
        </p>
        <p className={para}>
          The Zillion Dreamz Service is one of the Iconic Dream Focus Products,
          provided to you by Iconic Dream Focus, Inc. These Terms of Use
          therefore constitute an agreement between you and Iconic Dream Focus,
          Inc.
        </p>
      </div>
      <div className={card}>
        <h5 className={title}>The Zillion Dreamz Service</h5>
        <p className={para}>
          We agree to provide you with the Zillion Dreamz Service. The Service
          includes all of the Zillion Dreamz products, features, applications,
          services, technologies and software that we provide to advance Zillion
          Dreamz's mission: To bring you closer to the people and things you
          love. The Service is made up of the following aspects:
        </p>
        <ul>
          <li>
            <strong>
              Offering customized opportunities to create, connect, communicate,
              discover and share.
            </strong>
            <br></br>
            <p>
              People have so many dreams. We want to make you achieve your
              dreams, by writing down your goals, and we make you follow them by
              creating your own task to attain that goal. Also, we want to
              strengthen your relationships through shared experiences that you
              actually care about. So we build systems that try to understand
              who and what you and others care about, and use that information
              to help you create, find, join and share in experiences that
              matter to you. Part of that is highlighting content, features,
              offers and accounts that you might be interested in, and offering
              ways for you to experience Zillion Dreamz, based on things that
              you and others do on and off Zillion Dreamz.
            </p>
          </li>
          <li>
            <strong>Provide a safe environment.</strong>
            <br></br>
            <p>
              We develop and use tools and offer resources to our community
              members that help to make their experiences positive and
              inclusive, including when we think they might need help. We also
              have teams and systems that work to combat abuse and breaches of
              our Terms and Policies, as well as harmful and deceptive
              behaviour. We use all the information we have – including your
              information – to try to keep our platform secure. Learn more in
              the{" "}
              <Link to="/datapolicy" className="fw-bold cursor-pointer purple">
                Data Policy.
              </Link>
            </p>
          </li>
          <li>
            <strong>Ensuring access to our Service.</strong>
            <br></br>
            <p>
              To operate our global Service, we must store and transfer data
              across our systems around the world, including outside of your
              country of residence. The use of this global infrastructure is
              necessary and essential to provide our Service. This
              infrastructure may be owned or operated by Iconic Dream Focus,
              Inc., Iconic Dream Focus Pvt. Ltd., or their affiliates.
            </p>
          </li>
          <li>
            <strong>
              Connecting you with brands, products and services in ways you care
              about.
            </strong>
            <br></br>
            <p>
              We use data from Zillion Dreamz and other Iconic Dream Focus
              Company Products, as well as from third-party partners, to show
              you ads, offers and other sponsored content that we believe will
              be meaningful to you. And we try to make that content as relevant
              as all your other experiences on Zillion Dreamz.
            </p>
          </li>
          <li>
            <strong>Research and innovation.</strong>
            <br></br>
            <p>
              We use the information we have to study our Service and
              collaborate with others on research to make our Service better and
              contribute to the well-being of our community.
            </p>
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>How our Service is funded</h5>
        <p className={para}>
          Instead of paying to use Zillion Dreamz, by using the Service covered
          by these Terms, you acknowledge that we can show you ads that
          businesses and organisations pay us to promote on and off the Iconic
          Dream Focus Company Products. We use your personal data, such as
          information about your activity and interests, to show you ads that
          are more relevant to you.
        </p>
        <p className={para}>
          We show you relevant and useful ads without telling advertisers who
          you are. We don't sell your personal data. We allow advertisers to
          tell us things such as their business goal and the kind of audience
          they want to see their ads. We then show their ad to people who might
          be interested.
        </p>
        <p className={para}>
          We also provide advertisers with reports about the performance of
          their ads to help them understand how people are interacting with
          their content on and off Zillion Dreamz. For example, we provide
          general demographic and interest information to advertisers to help
          them better understand their audience. We don't share information that
          directly identifies you (information such as your name or email
          address that by itself can be used to contact you or identifies who
          you are) unless you give us specific permission.
        </p>
        <p className={para}>
          You may see branded content on Zillion Dreamz posted by account
          holders who promote products or services based on a commercial
          relationship with the business partner mentioned in their content.
        </p>
      </div>
      <div className={card}>
        <h5 className={title}>The Data Policy</h5>
        <p className={para}>
          Providing our Service requires collecting and using your information.
          The Data Policy explains how we collect, use and share information
          across the Iconic Dream Focus Products. It also explains the many ways
          in which you can control your information, including in the Zillion
          Dreamz privacy and security settings. You must agree to the Data
          Policy to use Zillion Dreamz.
        </p>
      </div>
      <div className={card}>
        <h5 className={title}>Your commitments</h5>
        <p className={para}>
          In return for our commitment to provide the Service, we require you to
          make the below commitments to us. <br></br>
          <span className="fw-bold">Who can use Zillion Dreamz.</span> We want
          our Service to be as open and inclusive as possible, but we also want
          it to be safe, secure and in accordance with the law. So, we need you
          to commit to a few restrictions in order to be part of the Zillion
          Dreamz community.
        </p>
        <ul>
          <li>
            You must be at least 13 years old or the minimum legal age in your
            country to use Zillion Dreamz.
          </li>
          <li>
            You must not be prohibited from receiving any aspect of our Service
            under applicable laws or engaging in payments-related Services if
            you are on an applicable denied party listing.
          </li>
          <li>
            We must not have previously disabled your account for violation of
            law or any of our policies.
          </li>
          <li>You must not be a convicted sex offender</li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>How you can't use Zillion Dreamz</h5>
        <p className={para}>
          Providing a safe and open Service for a broad community requires that
          we all do our part.
        </p>
        <ul>
          <li>
            <span className="fw-bold">How you can't use Zillion Dreamz. </span>
            <br></br>
            You don't have to disclose your identity on Zillion Dreamz, but you
            must provide us with accurate and up-to-date information (including
            registration information), which may include providing personal
            data. Also, you may not impersonate someone or something you aren't,
            and you can't create an account for someone else unless you have
            their express permission.
          </li>
          <li>
            <span className="fw-bold">
              You can't do anything unlawful, misleading or fraudulent or for an
              illegal or unauthorised purpose.
            </span>
          </li>
          <li>
            <span className="fw-bold">
              You can't violate (or help or encourage others to violate) these
              Terms or our policies, including in particular the{" "}
              <Link to="/help" className="cursor-pointer purple">
                Zillion Dreamz Community Guidelines
              </Link>
              .
            </span>
          </li>
          <li>
            <span className="fw-bold">
              You can't do anything to interfere with or impair the intended
              operation of the Service.
            </span>
            <br></br>
            This includes misusing any reporting, dispute or appeals channel,
            such as by making fraudulent or groundless reports or appeals.
          </li>
          <li>
            <span className="fw-bold">
              You can't attempt to create accounts or access or collect
              information in unauthorised ways.
            </span>
            <br></br>
            This includes creating accounts or collecting information in an
            automated way without our express permission.
          </li>
          <li>
            <span className="fw-bold">
              You can't sell, licence or purchase any account or data obtained
              from us or our Service.
            </span>
            <br></br>
            This includes attempts to buy, sell or transfer any aspect of your
            account (including your username); solicit, collect or use login
            credentials or badges of other users; or request or collect Zillion
            Dreamz usernames, passwords or misappropriate access tokens.
          </li>
          <li>
            <span className="fw-bold">
              You can't post someone else's private or confidential information
              without permission or do anything that violates someone else's
              rights, including intellectual property rights (e.g. copyright
              infringement, trademark infringement, counterfeit or pirated
              goods).
            </span>
            <br></br>
            You may use someone else's works under exceptions or limitations to
            copyright and related rights under applicable law. You represent
            that you own or have obtained all necessary rights to the content
            you post or share.
          </li>
          <li>
            <span className="fw-bold">
              You can't modify, translate, create derivative works of or reverse
              engineer our products or their components.
            </span>
          </li>
          <li>
            <span className="fw-bold">
              You can't use a domain name or URL in your username without our
              prior written consent.
            </span>
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>Permissions you give to us </h5>
        <p className={para}>
          As part of our agreement, you also give us permissions that we need to
          provide the Service.
        </p>
        <ul>
          <li>
            <span className="fw-bold">
              We do not claim ownership of your content, but you grant us a
              licence to use it.
            </span>
            <br></br>
            Nothing is changing about your rights in your content. We do not
            claim ownership of your content that you post on or through the
            Service and you are free to share your content with anyone else,
            wherever you choose. However, we need certain legal permissions from
            you (known as a "licence") to provide the Service. When you share,
            post or upload content that is covered by intellectual property
            rights (such as photos or videos) on or in connection with our
            Service, you hereby grant to us a non-exclusive, royalty-free,
            transferable, sub-licensable, worldwide licence to host, use,
            distribute, modify, run, copy, publicly perform or display,
            translate and create derivative works of your content (consistent
            with your privacy and application settings). This licence will end
            when your content is deleted from our systems. You can delete
            content individually or all at once by deleting your account.
          </li>
          <li>
            <span className="fw-bold">
              Permission to use your username, profile picture and information
              about your relationships and actions with accounts, ads and
              sponsored content.
            </span>
            <br></br>
            You give us permission to show your username, profile picture and
            information about your actions (such as likes) or relationships
            (such as follows) next to or in connection with accounts, ads,
            offers and other sponsored content that you follow or engage with
            that are displayed on Facebook Products, without any compensation to
            you. For example, we may show that you liked a sponsored post
            created by a brand that has paid us to display its ads on Zillion
            Dreamz. As with actions on other content and follows of other
            accounts, actions on sponsored content and follows of sponsored
            accounts can be seen only by people who have permission to see that
            content or follow. We will also respect your ad settings.
          </li>
          <li>
            <span className="fw-bold">
              You agree that we can download and install updates to the Service
              on your device.
            </span>
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>Additional rights we retain</h5>
        <ul>
          <li>
            If you select a username or similar identifier for your account, we
            may change it if we believe it is appropriate or necessary (for
            example, if it infringes someone's intellectual property or
            impersonates another user).
          </li>
          <li>
            If you use content covered by intellectual property rights that we
            have and make available in our Service (for example, images,
            designs, videos, or sounds we provide that you add to content you
            create or share), we retain all rights to our content (but not
            yours).
          </li>
          <li>
            You can only use our intellectual property and trademarks or similar
            marks with our prior written permission.
          </li>
          <li>
            You must obtain written permission from us or under an open-source
            licence to modify, create derivative works of, decompile or
            otherwise attempt to extract source code from us.
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>
          Content removal and disabling or terminating your account
        </h5>
        <ul>
          <li>
            We can remove any content or information that you share on the
            Service if we believe that it violates these Terms of Use, our
            policies (including our{" "}
            <Link to="/help" className="fw-bold cursor-pointer purple">
              Zillion Dreamz Community Guidelines
            </Link>{" "}
            ) or we are permitted or required to do so by law. We can refuse to
            provide or stop providing all or part of the Service to you
            (including terminating or disabling your access to the Iconic Dream
            Focus Products and Iconic Dream Focus Company Products) immediately
            to protect our community or services, or if you create risk or legal
            exposure for us, violate these Terms of Use or our policies
            (including our{" "}
            <Link to="/help" className="fw-bold cursor-pointer purple">
              Zillion Dreamz Community Guidelines
            </Link>{" "}
            ), if you repeatedly infringe other people's intellectual property
            rights, or where we are permitted or required to do so by law. We
            can also terminate or change the Service, remove or block content or
            information shared on our Service, or stop providing all or part of
            the Service if we determine that doing so is reasonably necessary to
            avoid or mitigate adverse legal or regulatory impacts on us.
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>Our agreement and what happens if we disagree</h5>
        <p className={para}>
          <strong>Who has rights under this agreement?</strong>
        </p>
        <ul>
          <li>This agreement does not give rights to any third parties.</li>
          <li>
            You cannot transfer your rights or obligations under this agreement
            without our consent.
          </li>
          <li>
            Our rights and obligations can be assigned to others. For example,
            this could occur if our ownership changes (as in a merger,
            acquisition or sale of assets) or by law.
          </li>
        </ul>
        <p className={para}>
          <strong>Who is responsible if something happens?</strong>
        </p>
        <ul>
          <li>
            Our Service is provided "as is", and we can't guarantee that it will
            be safe and secure or will work perfectly all the time. TO THE
            EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM ALL WARRANTIES, WHETHER
            EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
            NON-INFRINGEMENT.
          </li>
          <li>
            We also don't control what people and others do or say, and we
            aren't responsible for their (or your) actions or conduct (whether
            online or offline) or content (including unlawful or objectionable
            content). We also aren't responsible for services and features
            offered by other people or companies, even if you access them
            through our Service.
          </li>
          <li>
            Our responsibility for anything that happens on the Service (also
            called "liability") is limited as much as the law will allow. If
            there is an issue with our Service, we can't know what all the
            possible impacts might be. You agree that we won't be responsible
            ("liable") for any lost profits, revenues, information or data, or
            consequential, special, indirect, exemplary, punitive or incidental
            damages arising out of or related to these Terms, even if we know
            that they are possible. This includes when we delete your content,
            information or account.
          </li>
        </ul>
      </div>
      <div className={card}>
        <h5 className={title}>Unsolicited material</h5>
        <p className={para}>
          We always appreciate feedback or other suggestions, but may use them
          without any restrictions or obligation to compensate you for them, and
          are under no obligation to keep them confidential
        </p>
      </div>
      <div className={card}>
        <h5 className={title}>Updating these Terms</h5>
        <p className={para}>
          We may change our Service and Policies, and we may need to make
          changes to these Terms so that they accurately reflect our Service and
          Policies. Unless otherwise required by law, we will notify you (for
          example, through our Service) before we make changes to these Terms
          and give you an opportunity to review them before they go into effect.
          Then, if you continue to use the Service, you will be bound by the
          updated Terms.
        </p>
        <p className={`mt-2 ${para}`}>Revised: 20 December 2021</p>
      </div>
    </div>
  );
}
