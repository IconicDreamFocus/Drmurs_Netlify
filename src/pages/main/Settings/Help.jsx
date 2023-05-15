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

export default function Help() {
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
          ZD COMMUNITY GUIDELINES
        </div>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <div className={para}>
          <em>
            <strong>
              COVID-19: Community Guidelines updates and protections:
            </strong>{" "}
            As people around the world confront this unprecedented public health
            emergency, we want to make sure that our Community Guidelines
            protect people from harmful content and new types of abuse related
            to COVID-19. We're working to remove content that has the potential
            to contribute to real-world harm, including through our policies
            prohibiting coordination of harm, sale of medical masks and related
            goods, hate speech, bullying and harassment, and misinformation that
            contributes to the risk of imminent violence or physical harm. As
            the situation evolves, we continue to look at content on the
            platform, assess speech trends and engage with experts, and will
            provide additional policy guidance when appropriate to keep the
            members of our community safe during this crisis.
          </em>
          <h5 className={`${subtitle} mt-2`}>The short</h5>
          <p>
            We want Zillion Dreamz to continue to be an authentic and safe place
            for inspiration and expression. Help us foster this community. Post
            only your own photos and videos, and always follow the law. Respect
            everyone on Zillion Dreamz; don't spam people or post nudity.
          </p>
          <h5 className={subtitle}>The long</h5>
          <p>
            Zillion Dreamz is a reflection of our diverse community of cultures,
            ages and beliefs. We've spent a lot of time thinking about the
            different points of view that create a safe and open environment for
            everyone.
          </p>
          <p>
            We created the Community Guidelines so you can help us foster and
            protect this amazing community. By using Zillion Dreamz, you agree
            to these guidelines and our Terms of Use. We're committed to these
            guidelines and we hope that you are too. Overstepping these
            boundaries may result in deleted content, disabled accounts or other
            restrictions.
          </p>
          <p>
            In some cases, we allow content for public awareness which would
            otherwise go against our Community Guidelines – if it is newsworthy
            and in the public interest. We only do this after weighing the
            public interest value against the risk of harm and we look to
            international human rights standards to make these judgments.
          </p>
          <ul>
            <li>
              <strong>
                Share only photos and videos that you've taken or have the right
                to share.
              </strong>
              <p>
                As always, you own the content that you post on Zillion Dreamz.
                Remember to post authentic content, and don't post anything that
                you've copied or collected from the Internet that you don't have
                the right to post.
              </p>
            </li>
            <li>
              <strong>
                Post photos and videos that are appropriate for a diverse
                audience.
              </strong>
              <p>
                We know that there are times when people might want to share
                nude images that are artistic or creative in nature, but for a
                variety of reasons, we don't allow nudity on Zillion Dreamz.
                This includes photos, videos and some digitally-created content
                that show sexual intercourse, genitals and close-ups of
                fully-nude buttocks. It also includes some photos of female
                nipples, but photos in the context of breastfeeding, birth
                giving and after-birth moments, health-related situations (for
                example, post-mastectomy, breast cancer awareness or gender
                confirmation surgery) or an act of protest are allowed. Nudity
                in photos of paintings and sculptures is{" "}
                <strong>not permitted</strong> too.
              </p>
              <p>
                People like to share photos or videos of their children. For
                safety reasons, there are times when we may remove images that
                show nude or partially nude children. Even when this content is
                shared with good intentions, it could be used by others in
                unanticipated ways.
              </p>
            </li>
            <li>
              <strong>Foster meaningful and genuine interactions</strong>
              <p>
                Help us stay spam-free by not artificially collecting likes,
                followers or shares, posting repetitive comments or content, or
                repeatedly contacting people for commercial purposes without
                their consent. Don't offer money or giveaways of money in
                exchange for likes, followers, comments or other engagement.
                Don't post content that engages in, promotes, encourages,
                facilitates or admits to the offering, solicitation or trade of
                fake and misleading user reviews or ratings.
              </p>
              <p>
                You don't have to use your real name on Zillion Dreamz, but we
                do require Zillion Dreamz users to provide us with accurate and
                up-to-date information. Don't impersonate others and don't
                create accounts for the purpose of violating our guidelines or
                misleading others.
              </p>
            </li>
            <li>
              <strong>Follow the law</strong>
              <p>
                Zillion Dreamz is not a place to support or praise terrorism,
                organised crime or hate groups. Offering sexual services, buying
                or selling firearms, alcohol and tobacco products between
                private individuals, and buying or selling non-medical or
                pharmaceutical drugs are also not allowed. We also remove
                content that attempts to trade, co-ordinate the trade of,
                donate, gift or ask for non-medical drugs, as well as content
                that either admits to personal use (unless in the recovery
                context) or coordinates or promotes the use of non-medical
                drugs. Zillion Dreamz also prohibits the sale of live animals
                between private individuals, although brick-and-mortar shops may
                offer these sales. No one may coordinate poaching or selling of
                endangered species or their parts.
              </p>
            </li>
            <li>
              <strong>
                Respect other members of the Zillion Dreamz community
              </strong>
              <p>
                We want to foster a positive, diverse community. We remove
                content that contains credible threats or hate speech, content
                that targets private individuals to degrade or shame them,
                personal information meant to blackmail or harass someone, and
                repeated unwanted messages. We do generally allow stronger
                conversation around people who are featured in the news or have
                a large public audience due to their profession or chosen
                activities.
              </p>
              <p>
                It's never OK to encourage violence or attack anyone based on
                their race, ethnicity, national origin, sex, gender, gender
                identity, sexual orientation, religious affiliation,
                disabilities or diseases. When hate speech is being shared to
                challenge it or to raise awareness, we may allow it. In those
                instances, we ask that you express your intent clearly.
              </p>
              <p>
                Serious threats of harm to public and personal safety aren't
                allowed. This includes specific threats of physical harm as well
                as threats of theft, vandalism and other financial harm. We
                carefully review reports of threats and consider many things
                when determining whether a threat is credible.
              </p>
            </li>
            <li>
              <strong>
                Maintain our supportive environment by not glorifying
                self-injury.
              </strong>
              <p>
                The Zillion Dreamz community cares for each other, and is often
                a place where people facing difficult issues such as eating
                disorders, cutting or other kinds of self-injury come together
                to create awareness or find support. We try to do our part by
                providing education in the app and adding information in the
                Help Centre so people can get the help they need.
              </p>
              <p>
                Encouraging or urging people to embrace self-injury is counter
                to this environment of support, and we'll remove it or disable
                accounts if it's reported to us. We may also remove content
                identifying victims or survivors of self-injury if the content
                targets them for attack or humour.
              </p>
            </li>
            <li>
              <strong>Be thoughtful when posting newsworthy events.</strong>
              <p>
                We understand that many people use Zillion Dreamz to share
                important and newsworthy events. Some of these issues can
                involve graphic images. Because so many different people and age
                groups use Zillion Dreamz, we may remove videos of intense,
                graphic violence to make sure that Zillion Dreamz stays
                appropriate for everyone.
              </p>
              <p>
                We understand that people often share this kind of content to
                condemn, raise awareness or educate. If you do share content for
                these reasons, we encourage you to caption your photo with a
                warning about graphic violence. Sharing graphic images for
                sadistic pleasure or to glorify violence is never allowed.
              </p>
            </li>
          </ul>
          <p>Help us keep the community strong:</p>
          <ul>
            <li>
              Each of us is an important part of the Zillion Dreamz community.
              If you see something that you think may violate our guidelines,
              please help us by using our built-in reporting option. We have a
              global team that reviews these reports and works as quickly as
              possible to remove content that doesn't meet our guidelines. Even
              if you or someone you know doesn't have a Zillion Dreamz account,
              you can still file a report. When you complete the report, try to
              provide as much information as possible, such as links, usernames
              and descriptions of the content, so we can find and review it
              quickly. We may remove entire posts if either the imagery or
              associated captions violate our guidelines.
            </li>
            <li>
              You may find content that you don't like, but doesn't violate the
              Community Guidelines. If that happens, you can unfollow or block
              the person who posted it. If there's something that you don't like
              in a comment on one of your posts, you can delete that comment.
            </li>
            <li>
              Many disputes and misunderstandings can be resolved directly
              between members of the community. If one of your photos or videos
              was posted by someone else, you could try commenting on the post
              and asking the person to take it down. If that doesn't work, you
              can file a copyright report. If you believe that someone is
              violating your trademark, you can file a trademark report. Don't
              target the person who posted it by posting screenshots and drawing
              attention to the situation because that may be classified as
              harassment.
            </li>
            <li>
              We may work with law enforcement, including when we believe that
              there's risk of physical harm or threat to public safety.
            </li>
          </ul>
          <p>
            For more information, see our{" "}
            <Link to="/terms-of-use" className="fw-bold cursor-pointer purple">
              Terms of Use
            </Link>
            .
          </p>
          <p>
            Thank you for helping us create one of the best communities in the
            world,
          </p>
          <p className="fw-bold">The Zillion Dreamz Team.</p>
        </div>
      </div>
    </div>
  );
}
