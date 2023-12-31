/** @format */

import React from "react";
import styled from "styled-components";
// import AboutPhoto from "../imgs/traffic-3098747_1920.jpg";
// import AboutPhoto from "../Navbar/RCHDIGIMP_Logo.jpg";
// import ReactGA from "react-ga";
import Helmet from "react-helmet";

const About2 = ({ language }) => {
	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<AboutPageWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Helmet dir={language === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title dir='rtl'>اكس لوك | من نحن ولماذا اكس لوك</title>
				) : (
					<title>XLOOK | WHO & WHY XLOOK</title>
				)}
				<meta
					name='description'
					content={
						language === "Arabic"
							? ` XLOOK بدإخل مرص.
					ىه منصة تضم جميع صالونات إلحالقة ومحالت إلكوإفريإلحريىم و إلبيوت ى
					إلمنصة تقدم إلخدمات لكل أفرإد إالرسة سوإء سيدإت, آنسات, رجال أو أوالد فللجميع مكان وخدمات مقدمة.
					سني ى تستخدم منصة XLOOK مع
					ى
					الختيار وحجز موعد صالون حالقة إو بيوت عرض إالقرب لالبعد حسب مكانك.
					ىت ىت يقوم إلزإئرين بحجز إلخدمات إل
					أوطال
					تقدمها إلمنصة من خالل أبليكيشن خاص لتسجيل وحجز إلمستخدمرين
					إلخدمات إلتجميلية. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers
					located in Egypt.
					The platform offers services for all family members, including women, girls, men, and
					children, with a variety of services provided.
					The XLOOK platform is used to choose and book a barbershop or beauty center appointment
					with the closest to the farthest offer according to your location. Visitors can book the services
					offered by the platform through a special application designed for user registration and booking
					beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/about' />
			</Helmet>
			<div className='col-md-12' dir={language === "Arabic" ? "rtl" : "ltr"}>
				<img src='' className='img-fluid' alt='Infinite-Apps' />
			</div>
			<div
				className='container'
				dir={language === "Arabic" ? "rtl" : "ltr"}
				style={{ textAlign: language === "Arabic" ? "right" : "" }}
			>
				<div className=''>
					<h1 dir={language === "Arabic" ? "rtl" : "ltr"}>
						{" "}
						<strong>
							{language === "Arabic" ? "ما هو إكس لوك؟" : "What is XLOOK?"}
						</strong>{" "}
					</h1>
					<p dir={language === "Arabic" ? "rtl" : "ltr"}>
						{language === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة ومراكز الجمال والتجميل الموجودة في مصر. المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة. منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك. الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل.`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers located in Egypt. The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided. The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location. Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services.`}
					</p>
				</div>
				<div className='col-md-5 mx-auto mt-5 mb-3'>
					<div className='horizLine'></div>
				</div>
				<div
					className='col-md-10 mx-auto'
					dir={language === "Arabic" ? "rtl" : "ltr"}
				>
					<h1 dir={language === "Arabic" ? "rtl" : "ltr"}>
						{" "}
						<strong>
							{language === "Arabic" ? "لماذا إكس لوك؟" : "Why XLOOK?"}
						</strong>{" "}
					</h1>
					<h2>
						{language === "Arabic"
							? "عملاء جدد، حجوزات أكثر."
							: "New customers, more bookings."}
					</h2>
					<p>
						{language === "Arabic"
							? "لدينا آلاف العملاء في منطقتك ينتظرون لحجز موعد في صالونك أو مركز التجميل الخاص بك، فهو مناسب جدًا لهم. لا تتردد في الانضمام الآن."
							: "We have thousands of customers in your area waiting to make a reservation, and your salon or beauty center is very suitable for them. Do not hesitate to join now."}
					</p>
				</div>

				<div className='col-md-10 mx-auto mt-5 mb-3'>
					<h2>
						{" "}
						<strong>
							{language === "Arabic"
								? "زيادة مصادر الدخل."
								: "Increase sources of income."}
						</strong>{" "}
					</h2>
					<p>
						{language === "Arabic"
							? "سيكون الفرق واضحًا جدًا عند مقارنة دخلك قبل الانضمام إلينا كشريك وبعد الانضمام. ستترك التسويق لنا وتقلل من النفقات على الإعلانات، وستحصل على المزيد من الحجوزات. هنا، ستكون التوفيرات من كلا الجانبين."
							: "The difference will be very clear when comparing your income before joining us as a partner and after joining. You will leave the marketing to us and reduce expenses on advertisements, and you will receive more bookings. Here, the savings will be from both sides."}
					</p>
				</div>

				<div className='col-md-10 mx-auto mt-5 mb-3'>
					<h2>
						{" "}
						<strong>
							{language === "Arabic" ? "موقع حصري." : "Exclusive website."}
						</strong>{" "}
					</h2>
					<p>
						{language === "Arabic"
							? "أخيرًا، صالونك لديه موقع ويب احترافي ومتخصص خاص به لعرض قدراتك وخدماتك على منصة مصممة لمراكز وصالونات التجميل. ستتيح لك هذه الخاصية تقديم جميع خدماتك وفريقك المتخصص والمحترف."
							: "Finally, your salon has its own professional and specialized website to showcase your capabilities and services on a platform designed for beauty centers and salons. This will allow you to present all your services and your professional and specialized team."}
					</p>
				</div>

				<div className='col-md-10 mx-auto mt-5 mb-3'>
					<h2>
						{" "}
						<strong>
							{language === "Arabic"
								? "معنا ستزداد توسعاتك وفروعك."
								: "With us, your expansions and branches will increase."}
						</strong>{" "}
					</h2>
					<p>
						{language === "Arabic"
							? "نحرص دائمًا على تأمين حجوزات لك، وذلك سيزيد من حجوزاتك وعدد عملائك من خلال التركيز على تطوير الخدمة المستمر. ونتيجة لذلك، ستزداد قدراتك وفرص توسعك."
							: "We always ensure that you have bookings, which will increase your bookings and customers by focusing on continuous service development. As a result, your capabilities and opportunities for expansion will increase."}
					</p>
				</div>

				<div className='col-md-10 mx-auto mt-5 mb-3'>
					<h2>
						{" "}
						<strong>
							{language === "Arabic"
								? "ستكتشف حتى إذا لم تكن موقعك على الشارع الرئيسي."
								: "You'll be discovered even if your location is not on the main street."}
						</strong>{" "}
					</h2>
					<p>
						{language === "Arabic"
							? "مع منصة XLOOK ، ستكتشف حتى إذا كان موقعك مخفيًا عن الشارع الرئيسي. بمجرد تفعيل حسابك ، ستكون حقًا جزءًا من المنافسة وسيتم اكتشافك من قبل الجميع في منطقتك."
							: "With XLOOK platform, you'll be discovered even if your location is hidden from the street. Once you activate your account, you will truly be part of the competition and will be discovered by everyone in your area."}
					</p>
				</div>

				<div className='col-md-5 mx-auto mt-5 mb-3'>
					<div className='horizLine'></div>
				</div>
				<div className='col-md-10 mx-auto'>
					<h2>
						{" "}
						<strong>
							{language === "Arabic"
								? "تسويق محترف."
								: "Professional marketing."}
						</strong>{" "}
					</h2>
					<p>
						{language === "Arabic"
							? "قررنا أن نخفف عنك الجهد والتكاليف في التسويق مقابل تقديم خدمات عالية الجودة وتركيز قوي على رضا العملاء ، وهو أمر يعد دائمًا أولوية. تحتاج فقط إلى الحفاظ على تقييمات العملاء الخاصة بك ، وهذا هو نهاية دورك في التسويق. لدينا حجوزات حصرية محجوزة لك لأيام."
							: "We have decided to relieve you of the effort and costs of marketing in exchange for providing high-quality services and a strong focus on customer satisfaction, which is always a priority. You only need to maintain your customer reviews, and that's the end of your marketing role. We have exclusive bookings reserved for you for days."}
					</p>
				</div>

				<div className='col-md-10 mx-auto mt-5 mb-3'>
					{language === "Arabic" ? (
						<h2>
							{" "}
							<strong>
								كن شريكًا ناجحًا معنا في إكس لوك.
								<br />
								أحد أهم مزايا الانضمام إلى منصة إكس لوك هو:
							</strong>{" "}
						</h2>
					) : (
						<h2>
							{" "}
							<strong>
								Be a successful partner with us at XLOOK.
								<br />
								One of the main advantages of joining the XLOOK platform is:
							</strong>{" "}
						</h2>
					)}

					{language === "Arabic" ? (
						<ul>
							<li>
								كشريك، نعدك بأن حجوزاتك اليومية ستكتمل وسيتم تأكيد حجوزاتك
								دائمًا.
							</li>
							<li>
								ستترك جزءًا كبيرًا من مسؤوليات التسويق لنا، مما يتيح لك التركيز
								أكثر على تقديم خدمات جديدة وتحسين الخدمات الحالية.
							</li>
							<li>سوف تحصل على مصدر إضافي مجاني لزيادة أرباحك.</li>
							<li>
								ستتمكن من إدارة جميع فروعك من شاشة واحدة والوصول إلى جميع
								التفاصيل من خلال التقارير المصاحبة لأصحاب صالونات التجميل ومراكز
								التجميل.
							</li>
							<li>
								إكس لوك ليست مجرد منصة حجوزات عبر الإنترنت، بل هي برنامج إدارة
								صالونات شامل يتيح لك تتبع الحسابات والحجوزات عبر الإنترنت، بما
								في ذلك حجوزات عملائك العاديين.
							</li>
							<li>
								سيكون لديك رابط موقع الويب الخاص بك الذي يمكنك توزيعه على
								عملائك، مما يتيح لهم عرض أحدث العروض والتحديثات.
							</li>
						</ul>
					) : (
						<ul>
							<li>
								As a partner, we promise that your daily bookings will be
								complete, and your reservations will always be confirmed.
							</li>

							<li>
								You will leave a significant part of marketing concerns to us,
								allowing you to focus more on providing new services and
								improving existing ones.
							</li>

							<li>
								You will have an additional free source to increase your
								profits.
							</li>

							<li>
								You will be able to manage all your branches from a single
								screen and access all the details through the accompanying
								reports for salon owners and beauty centers.
							</li>

							<li>
								XLOOK is not just an online booking platform, but a complete
								salon management program that allows you to track online
								accounts and reservations, including those from your regular
								clients.
							</li>
							<li>
								You will have your own dedicated website link that you can
								distribute to your clients, enabling them to view the latest
								offers and updates.
							</li>
						</ul>
					)}
				</div>
			</div>
		</AboutPageWrapper>
	);
};

export default About2;

const AboutPageWrapper = styled.section`
	background: #f8f9fa;
	padding-bottom: 100px;
	padding-top: 50px;
	overflow: hidden;
	min-height: 1000px;

	.horizLine {
		border-bottom: var(--primaryColor) solid 5px !important;
	}

	h1 {
		font-weight: bolder;
		font-size: 1.7rem;
	}

	h2 {
		font-weight: bolder;
		font-size: 1.3rem;
	}

	p {
		font-size: 1rem;
	}

	li {
		font-size: 1rem;
	}

	@media (max-width: 1000px) {
	}
`;
