import { ts, pause, notif, text, emote, pic, choice } from "../helpers";

export const version = "menace-1.0";

export const chars = [{
	key: "varka",
	name: "golden retriever ouppy",
	pfp: "/pfp/varka.webp",
	chatpfp: "/pfp/varka.png",
	chats: [
		ts("16:06"),
		choice(null, null, "text", "v1-1", "so like do you think flins would look at me weird"),
		choice(null, null, "text", "v2-1", "if i tell him his new piercings look really hot on him"),
		text("On the contraty, I believe he would be very much pleased to hear that."),
		choice(null, null, "text", "v3-1", "is that proper punctuations????? you've been hanging out with flins too much"),
		choice(null, null, "text", "v4-1", "go hang out with that crush of yours instead, i saw them giving you bedroom eyes last rugby match"),
		text("Oh?"),
		text("Duly noted. I will be sure to use this information well."),
		choice(null, null, "text", "v5-1", "yeah pls just ask them out already"),
		choice(null, null, "text", "v6-1", "that way you can ask them to ask flins if he likes me enough to go on a date with him"),
		text("May I enquire the reasons to your implied hesistance in asking him out yourself?"),
		choice(null, null, 
			"text", "v7-1", "ARE YOU CRAZY  I CAN'T DO THTA", 
			"emote", "v7-2", "/emote/jahoda11.png"),
		choice(null, null, "text", "v8-1", "I FREEZE WHENEVER HE LOOKSAT ME WITH LTHOSE INTENNS EYE S"),
		text("I see. I daresay he thinks that your reaction is adorable regardless."),
		choice(null, null, "text", "v9-1", "is this what they call exposure therapy"),
		choice(null, null, "text", "v10-1", "btw why are you talking like my love my heart my light kyryll chudomirovich flins stop it ew"),
		text("Yes, is that not a wonder indeed?"),
		choice(null, null, "text", "v11-1", "oh wait i see you"),
		choice(null, null, "text", "v12-1", "cmere so i can preach about my lord and savior kyryll chudomirovich flins"),
		choice(null, null, "text", "v13-1", "i'm on your right"),
		choice(null, null, "text", "v14-1", "hey"),
		choice(null, null, "text", "v15-1", "dumbass i'm like right here can you shove your fans away for a moment"),
		text("Ah, to think that this pleasant chat will be over soon. What a shame."),
		text("I understand the tumultuous emotions you must be facing now, however please don't be too embarrassed, ${name}.", null, 5000),
		choice(null, 5000, "text", "v16-1", "INMGSO SOoRRY"),
		text("There is no need to apologize for honest mistakes. I was most definitely not offended by this fortunate mishap."),
		text("In fact, I rather enjoyed the experience. Your enthusiasm was a delight to witness."),
		text("On a related note, I quite enjoy fresh sashimi, if you're up for it today after class."),
		emote("/emote/flins2.png")
	]

}, {
	key: "flins",
	name: "[e(mo]m)",
	pfp: "/pfp/flins.gif",
	chatpfp: "/pfp/flins.png",
	chats: [
        ts("11:05"),
        choice(null, null, "text", "f1-1", "hey"),
        text("Hey!"),
        choice(null, null, "text", "f2-1", "wow you're unusually chipper! did you really enjoy that date with your soon-to-be-pookie"),
        text("Uhhh", null, 500),
        text("Sorry who??"),
        choice(null, null, "text", "f3-1", "????? are u ok. you went for that date yesterday right?????"),
        text("NO"),
        text("Hell no"),
        text("What date???"),
        choice(null, null, "text", "f4-1", "did you get a concussion from that stray rugby ball varka threw at you this morning"),
        text("What???"),
        choice(null, null, "text", "f5-1", "wait hold your concussion did you see him this morning all sweaty"),
        choice(null, null, "text", "f6-1", "what kinda abs are those man what does he eat"),
        choice(null, null, "text", "f7-1", "(me, he should be eating ME)"),
        text("jrgf s", null, 500),
        text("Uh"),
        text("So", null, 5000),
        text("Uh", null, 3000),
        text("${name}"),
        text("I'm Varka", null, 3000),
        choice(null, null, "text", "f8-1", "yeah and i'm the demon barbatos"),
        text("You're what"),
        text("Oh you're joking", null, 4000),
        text("${name} you're so funny lol"),
        choice(null, null, "text", "f9-1", "I'M FUCKING SORRY??????"),
        choice(null, null, "text", "f10-1", "'lol'????? WHO ARE YOU"),
        emote("/emote/varka5.png"),
        text("I told you I'm Varka"),
        choice(null, null, "text", "f11-1", "oh", "text", "f11-2", "stop fucking with me, kyryll chudomirovich flins"),
        text("Oh er ok wait", "f11-2"),
        notif("[e(mo]m) has sent a picture", "f11-2", 6000),
        pic("/pic/varka1.png", "f11-2", 500),
        choice("f11-2", null, "text", "f12-1", "oh"),
        text("Yeah"),
        text("Haha"),
        text("So"),
        text("Anyway!!"),
        text("Do you wanna grab a drink sometime maybe? My treat!"),
        emote("/emote/varka6.png")
    ]

}, {
	key: "kaveh",
	name: "veveh",
	pfp: "/pfp/kaveh.gif",
	chatpfp: "/pfp/kaveh.png",
	chats: [
        ts("19:30"),
        choice(null, null, "text", "k1-1", "Hello."),
        text("Hello."),
        choice(null, null, "text", "k2-1", "You forgot your things in the library."),
        text("I don't believe I lost anything as I haven't perused the library for the past three days."),
        choice(null, null, "text", "k3-1", "But these documents have your names?"),
        choice(null, null, "text", "k4-1", "Just to check, are you drunk right now?"),
        text("I will not bother to entertain such a baseless accusation."),
        choice(null, null, "text", "k5-1", "Have you gotten so fed up with your roommate you started to emulate his manner of speech in texts??"),
        choice(null, null, "text", "k6-1", "What did Alhaitham do this time?"),
        text("Hm."),
        text("This is quite an interesting predicament."),
        choice(null, null, "text", "k7-1", "I told you he cares, he just has an unique way to express it."),
        choice(null, null, "text", "k8-1", "I mean come on, any man with those abs could do no wrong."),
        text("I find no logical correlation between those two variables, but your compliment is noted down for future reference."),
        choice(null, null, "text", "k9-1", "So you do admit Alhaitham is aesthetically pleasing?"),
        text("Despite possessing an exceptional pair of eyes and sense of aesthetics, it appears you don't retain the same degree of meticulousness."),
        text("Have you wronged a friend and fallen into a prank, perhaps?"),
        text("Or in your own carelessness, you've somehow marked my contact number as a certain alcoholic architect's?"),
        choice(null, 5000, "text", "k10-1", "I'd like to submit a resignation notice and permanently exit this conversation."),
        text("Denied."),
        text("Think of a better proposal, and I may consider reevaluating my approval."),
        choice(null, null, "text", "k11-1", "I'm not sure what you mean...", "text", "k11-2", "Would you like to get coffee tomorrow lunch time?"),
        text("Even the density of black holes has nothing on you.", "k11-1", 4000),
        text("Just come to my office tomorrow at lunch time.", "k11-1"),
        text("Yes.", "k11-2")
    ]

    

}, {
	key: "neuvillette",
	name: "Chief Justice Iudex Neuvillette",
	pfp: "/pfp/neuvillette.gif",
	chatpfp: "/pfp/neuvillette.png",
	chats: [
        ts("16:06"),

    ]



}, {
	key: "wriothesley",
	name: "rizz",
	pfp: "/pfp/wriothesley.gif",
	chatpfp: "/pfp/wriothesley.png",
	chats: [
        ts("16:06"),

    ]



}, {
	key: "lisa",
	name: "Library Proprietress",
	pfp: "/pfp/lisa.gif",
	chatpfp: "/pfp/lisa.png",
	chats: [
        ts("13:56"),

    ]

}].sort((a, b) => a.key.localeCompare(b.key));