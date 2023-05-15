import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

const container = "col-12 py-4 px-3 px-md-5";
const para = "mx-2 mx-md-4 mx-xl-5";
const subtitle = "fw-bold";
const title = "fw-bold text-center text-uppercase ";
const card = "bg-f3 py-4 mt-3 mb-5 px-2 px-md-4 li-y-shadow br-10";
const heading =
  "h2 mx-auto text-center fw-bold bg-f3 py-2 mb-3 px-5 li-y-shadow br-10";

export default function DataPolicy() {
  const history = useHistory();
  return (
    <div className={container}>
      <div className="d-flex">
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 cursor-pointer"
          sx={{ fontSize: 30 }}
          onClick={() => history.goBack()}
        />
        <div
          className={heading}
          style={{
            borderRadius: 10,
          }}
        >
          Zillion Dreamz Data Policy
        </div>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Data Policy</h5>
        <p className={para}>
          This Policy describes the information we process to support Zillion
          Dreamz, Paarambariyam and other products and features offered by
          Iconic Dream Focus (Iconic Dream Focus Products or Products). You can
          find additional tools and information in Zillion Dreamz settings.
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          [ I ] What kinds of information do we collect?
        </h5>
        <p className={para}>
          To provide the Iconic Dream Focus Products, we must process
          information about you. The type of information that we collect depends
          on how you use our Products.
        </p>
        <h5 className="fw-bold my-2">
          Things that you and others do and provide.
        </h5>
        <ul>
          <li>
            <strong>Information and content you provide. </strong>We collect the
            content, communications and other information you provide when you
            use our Products, including when you sign up for an account, create
            or share content and message or communicate with others. This can
            include information in or about the content that you provide (e.g.
            metadata), such as the location of a photo or the date a file was
            created. It can also include what you see through features that we
            provide, such as our camera, so we can do things such as suggest
            masks and filters that you might like, or give you tips on using
            camera formats. Our systems automatically process content and
            communications that you and others provide to analyse context and
            what's in them for the purposes described below.
            <ul>
              <li>
                <strong> Data with special protections:</strong>
                You can choose to provide information in your Iconic Dream Focus
                profile fields or life events about your religious views,
                political views, who you are "interested in" or your health.
                This and other information (such as racial or ethnic origin,
                philosophical beliefs or trade union membership) could be
                subject to special protections under the laws of your country.
              </li>
            </ul>
          </li>
          <li>
            <strong> Networks and connections.</strong>
            We collect information about the people, Pages, accounts, hashtags
            and groups that you are connected to and how you interact with them
            across our Products, such as people you communicate with the most or
            groups that you are part of.
          </li>
          <li>
            <strong>Your usage. </strong>
            We collect information about how you use our Products, such as the
            types of content that you view or engage with, the features you use,
            the actions you take, the people or accounts you interact with and
            the time, frequency and duration of your activities. For example, we
            log when you're using and have last used our Products, and what
            posts, videos and other content you view on our Products. We also
            collect information about how you use features such as our camera.
          </li>
          <li>
            <strong>
              Thing{"'"}s others do and information they provide about you.
            </strong>{" "}
            We also receive and analyse content, communications and information
            that other people provide when they use our Products. This can
            include information about you, such as when others share or comment
            on a photo of you, send a message to you or upload, sync o import
            your contact information.
          </li>
        </ul>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Device Information</h5>
        <ul>
          As described below, we collect information from and about the
          computers, phones, connected TVs and other web-connected devices you
          use that integrate with our Products, and we combine this information
          across different devices you use. For example, we use information
          collected about your use of our Products on your phone to better
          personalise the content (including ads) or features that you see when
          you use our Products on another device, such as your laptop or tablet,
          or to measure whether you took an action in response to an ad that we
          showed you on your phone on a different device.<br></br>
          <span className="my-2">
            Information we obtain from these devices includes:
          </span>
          <li>
            <strong>Device attributes:</strong> information such as the
            operating system, hardware and software versions, battery level,
            signal strength, available storage space, browser type, app and file
            names and types, and plugins.
          </li>
          <li>
            <strong>Device operations:</strong> information about operations and
            behaviours performed on the device, such as whether a window is in
            the foreground or background, or mouse movements (which can help
            distinguish humans from bots).
          </li>
          <li>
            <strong>Identifiers:</strong> unique identifiers, device IDs and
            other identifiers, such as from games, apps or accounts that you
            use, and Family Device IDs (or other identifiers unique to Iconic
            Dream Focus Company Products associated with the same device or
            account).
          </li>
          <li>
            <strong>Device signals:</strong> Bluetooth signals, information
            about nearby Wi-Fi access points, beacons and mobile phone masts.
          </li>
          <li>
            <strong>Data from device settings:</strong> information you allow us
            to receive through device settings that you turn on, such as access
            to your GPS location, camera or photos
          </li>
          <li>
            <strong>Network and connections:</strong> information such as the
            name of your mobile operator or ISP, language, time zone, mobile
            phone number, IP address, connection speed and, in some cases,
            information about other devices that are nearby or on your network,
            so we can do things such as help you stream a video from your phone
            to your TV.
          </li>
        </ul>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Information from partners</h5>
        <p className={para}>
          Advertisers, app developers and publishers can send us information
          through Iconic Dream Focus Business Tools that they use, including our
          social plugins (such as the Like button), Iconic Dream Focus Login,
          our APIs and SDKs. These partners provide information about your
          activities off Iconic Dream Focus – including information about your
          device, websites you visit, the ads you see and how you use their
          services – whether or not you have an Zillion Dreamz account. For
          example, a game developer could use our API to tell us what games you
          play, or a business could tell us about a purchase you made in its
          shop. We also receive information about your online and offline
          actions and purchases from third-party data providers who have the
          rights to provide us with your information.
        </p>
        <p className={`mt-2 ${para}`}>
          Partners receive your data when you visit or use their services, or
          through third parties that they work with. We require each of these
          partners to have lawful rights to collect, use and share your data
          before providing us with any data.
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>[ II ] How do we use this information?</h5>
        <p className={para}>
          We use the information that we have (subject to choices you make) as
          described below, and to provide and support the Iconic Dream Focus
          Products and related services described in the Zillion Dreamz Terms.
          Here's how:
        </p>
        <h5 className="fw-bold my-2">
          Provide, personalise and improve our Products
        </h5>
        <ul>
          We use the information we have to deliver our Products, including to
          personalise features and content (including your Memoir, Zillion
          Dreamz Instant Moments(stories) and ads) and make suggestions for you
          (such as groups or events you may be interested in or topics you may
          want to follow) on and off our Products. To create personalised
          Products that are unique and relevant to you, we use your connections,
          preferences, interests and activities based on the data that we
          collect and learn from you and others (including any data with special
          protections you choose to provide); how you use and interact with our
          Products; and the people, places or things that you're connected to
          and interested in on and off our Products.
          <li>
            <strong>Location-related information: </strong>We use
            location-related information – such as your current location, where
            you live, the places you like to go, and the businesses and people
            you're near – to provide, personalise and improve our Products,
            including ads, for you and others. Location-related information can
            be based on things such as precise device location (if you've
            allowed us to collect it), IP addresses and information from your
            and others' use of Iconic Dream Focus Products (such as check-ins or
            events you attend).
          </li>
          <li>
            <strong>Product research and development: </strong> We use the
            information we have to develop, test and improve our Products,
            including by conducting surveys and research, and testing and
            troubleshooting new products and features.
          </li>
          <li>
            <strong>Ads and other sponsored content:</strong> We use the
            information we have about you – including information about your
            interests, actions and connections – to select and personalise ads,
            offers and other sponsored content that we show you.
          </li>
        </ul>
        <h5 className="fw-bold my-2">
          Providing measurement, analytics and other business services.
        </h5>
        <p className={para}>
          We use the information we have (including your activity off our
          Products, such as the websites you visit and ads you see) to help
          advertisers and other partners measure the effectiveness and
          distribution of their ads and services, and understand the types of
          people who use their services and how people interact with their
          websites, apps and services.
        </p>
        <h5 className="fw-bold my-2">Promote safety, integrity and security</h5>
        <p className={para}>
          We use the information that we have to verify accounts and activity,
          combat harmful conduct, detect and prevent spam and other bad
          experiences, maintain the integrity of our Products, and promote
          safety and security on and off Iconic Dream Focus Products. For
          example, we use data that we have to investigate suspicious activity
          or violations of our Terms or Policies, or to detect when someone
          needs help.
        </p>
        <h5 className="fw-bold my-2">Communicate with you</h5>
        <p className={para}>
          We use the information that we have to send you marketing
          communications, communicate with you about our Products and let you
          know about our Policies and Terms. We also use your information to
          respond to you when you contact us.
        </p>
        <h5 className="fw-bold my-2">
          Researching and innovating for social good
        </h5>
        <p className={para}>
          We use the information we have (including from research partners we
          collaborate with) to conduct and support research and innovation on
          topics of general social welfare, technological advancement, public
          interest, health and well-being. For example, we analyse information
          we have about migration patterns during crises to aid relief efforts
        </p>
      </div>

      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>[ III ] How is this information shared?</h5>
        <span className="">
          Your information is shared with others in the following ways:
        </span>
        <h5 className="fw-bold my-2">Sharing on Iconic Dream Focus Products</h5>
        <h5 className="fw-bold my-2">
          People and accounts that you share and communicate with
        </h5>
        <p className={para}>
          When you share and communicate using our Products, you choose the
          audience for what you share. For example, when you post on Iconic
          Dream Focus, you select the audience for the post, such as a group,
          all of your friends, the public or a customised list of people.
          <br></br>
          <strong>Public information</strong> can be seen by anyone, on or off
          our Products, including if they don't have an account. This includes
          your Zillion Dreamz username, any information you share with a public
          audience, information in your public profile on Zillion Dreamz, and
          content you share in. You, other people using Zillion Dreamz, and we
          can provide access to or send public information to anyone on or off
          our Products, including in other Iconic Dream Focus Company Products,
          in search results or through tools and APIs. Public information can
          also be seen, accessed, reshared or downloaded through third-party
          services such as search engines, APIs and offline media such as TV,
          and by apps, websites and other services that integrate with our
          Products.
        </p>
        <h5 className="fw-bold my-2">
          Content that others share or reshare about you
        </h5>
        <p className={para}>
          You should consider who you choose to share with, because people who
          can see your activity on our Products can choose to share it with
          others on and off our Products, including people and businesses
          outside the audience that you shared with. For example, when you share
          a post or send a message to specific friends or accounts, they can
          download, screenshot or reshare that content to others across or off
          our Products. Also, when you comment on someone else's post or react
          to their content, your comment or reaction is visible to anyone who
          can see the other person's content, and that person can change the
          audience later.
          <br></br>
          People can also use our Products to create and share content about you
          with the audience they choose. For example, people can share a photo
          of you in a story, mention or tag you at a location in a post, or
          share information about you in their posts or messages. If you are
          uncomfortable with what others have shared about you on our Products,
          you can learn how to report the content.
        </p>
        <h5 className="fw-bold my-2">New owner</h5>
        <p className={para}>
          If the ownership or control of all or part of our Products or their
          assets changes, we may transfer your information to the new owner.
        </p>
        <h5 className="fw-bold my-2">Sharing with third-party partners</h5>
        <p className={para}>
          We work with third-party partners who help us provide and improve our
          Products or who use Iconic Dream Focus Business Tools to grow their
          businesses, which makes it possible to operate our companies and
          provide free services to people around the world. We don't sell any of
          your information to anyone and we never will. We also impose strict
          restrictions on how our partners can use and disclose the data we
          provide. Here are the types of third parties that we share information
          with:
        </p>
        <h5 className="fw-bold my-2">
          Partners who use our analytics services.
        </h5>
        <p className={para}>
          We provide aggregated statistics and insights that help people and
          businesses understand how people are engaging with their posts,
          listings, Pages, videos and other content on and off the Iconic Dream
          Focus Products. For example, Page admins and Zillion Dreamz business
          profiles receive information about the number of people or accounts
          who viewed, reacted to or commented on their posts, as well as
          aggregate demographic and other information that helps them understand
          interactions with their Page or account.
        </p>
        <h5 className="fw-bold my-2">Advertisers</h5>
        <p className={para}>
          We provide advertisers with reports about the kinds of people seeing
          their ads and how their ads are performing, but we don't share
          information that personally identifies you (information such as your
          name or email address that by itself can be used to contact you or
          identifies who you are) unless you give us permission. For example, we
          provide general demographic and interest information to advertisers
          (for example, that an ad was seen by a woman between the ages of 25
          and 34 who lives in Madurai and likes software engineering) to help
          them better understand their audience. We also confirm which Iconic
          Dream Focus ads led you to make a purchase or take an action with an
          advertiser.
        </p>
        <h5 className="fw-bold my-2">Measurement partners</h5>
        <p className={para}>
          We share information about you with companies that aggregate it to
          provide analytics and measurement reports to our partners.
        </p>
        <h5 className="fw-bold my-2">
          Partners offering goods and services in our Products
        </h5>
        <p className={para}>
          When you subscribe to receive premium content, or buy something from a
          seller in our Products, the content creator or seller can receive your
          public information and other information that you share with them, as
          well as the information needed to complete the transaction, including
          shipping and contact details.
        </p>
        <h5 className="fw-bold my-2">Vendors and service providers</h5>
        <p className={para}>
          We provide information and content to vendors and service providers
          who support our business, such as by providing technical
          infrastructure services, analysing how our Products are used,
          providing customer service, facilitating payments or conducting
          surveys.
        </p>
        <h5 className="fw-bold my-2">Researchers and academics</h5>
        <p className={para}>
          We also provide information and content to research partners and
          academics to conduct research that advances scholarship and innovation
          that supports our business or mission and enhances discovery and
          innovation on topics of general social welfare, technological
          advancement, public interest, health and well-being.
        </p>
        <h5 className="fw-bold my-2">Law enforcement or legal requests</h5>
        <p className={para}>
          We share information with law enforcement or in response to legal
          requests in the circumstances outlined below.
          <div className="mt-2">
            Learn more about how you can control the information about you that
            you or others share with third-party partners in the Zillion Dreamz
            settings.
          </div>
        </p>
      </div>

      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          [ IV ] How do the Iconic Dream Focus Companies work together?
        </h5>
        <p className={para}>
          Iconic Dream Focus and Zillion Dreamz share infrastructure, systems
          and technology with other Iconic Dream Focus Companies (which include
          Paarambariyam and AI) to provide an innovative, relevant, consistent
          and safe experience across all Iconic Dream Focus Company Products
          that you use. We also process information about you across the Iconic
          Dream Focus Companies for these purposes, as permitted by applicable
          law and in accordance with their Terms and Policies. We also work to
          understand how people use and interact with Iconic Dream Focus Company
          Products, such as understanding the number of unique users on
          different Iconic Dream Focus Company Products.
        </p>
      </div>

      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          [ V ] How do we respond to legal requests or prevent harm?
        </h5>
        <p className={para}>
          We access, preserve and share your information with regulators, law
          enforcement or others:
        </p>
        <ul className={para}>
          <li>
            In response to a legal request (e.g. a search warrant, court order
            or subpoena) if we have a good-faith belief that the law requires us
            to do so. This may include responding to legal requests from
            jurisdictions outside of the United States when we have a good-faith
            belief that the response is required by law in that jurisdiction,
            affects users in that jurisdiction and is consistent with
            internationally recognised standards.
          </li>
          <li>
            When we have a good-faith belief that it is necessary to: detect,
            prevent and address fraud, unauthorised use of the Products,
            breaches of our Terms or Policies, or other harmful or illegal
            activity; to protect ourselves (including our rights, property or
            Products), you or others, including as part of investigations or
            regulatory enquiries; or to prevent death or imminent bodily harm.
            For example, if relevant, we provide information to and receive
            information from third-party partners about the reliability of your
            account to prevent fraud, abuse and other harmful activity on and
            off our Products.
          </li>
        </ul>
        <p className={`${para} mt-2`}>
          Information we receive about you (including financial transaction data
          related to purchases made with Iconic Dream Focus) can be accessed and
          preserved for an extended period when it is the subject of a legal
          request or obligation, governmental investigation or investigations of
          possible violations of our terms or policies, or otherwise to prevent
          harm. We also retain information from accounts disabled for term
          breaches for at least a year to prevent repeat abuse or other term
          breaches.
        </p>
      </div>

      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          [ VI ] How will we notify you of changes to this Policy?
        </h5>
        <p className={para}>
          We'll notify you before we make changes to this Policy and give you
          the opportunity to review the revised Policy before you choose to
          continue using our Products.
        </p>
      </div>

      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          [ VII ] How to contact Iconic Dream Focus with questions?
        </h5>
        <p className={para}>
          You can learn more about how privacy works on Zillion Dreamz. If you
          have questions about this Policy, you can contact us as described
          below.
        </p>
        <p className={`${para} mt-2`}>
          You can contact us online or by writing to:
        </p>
        <p className={`${para} mt-2`}>
          Iconic Dream Focus, Inc.<br></br>
          <em>
            No. 1884/5, Anna Nagar 18th Main Road, Vasantham Colony 4th street,
            Chennai – 600040.
          </em>
        </p>
        <p className={`${para} mt-3`}>
          Date of last revision: 20 December 2021
        </p>
      </div>
    </div>
  );
}
