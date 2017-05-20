/*-----------------------------------------------------
Table of Contents:

*Change Audience Names
+Unlock Research Stuff
*Change Genre Names Line
-Remove Notifications, Consoles, and Topics
*Review Notification Name Change
*Change Dev Focus Category Names
+Add new consoles
------------------------------------------------------*/

General.getAudienceLabel = function(a) {
    switch (a) {
        case "young":
            return "PG".localize("audience category");
        case "mature":
            return "PG-13".localize("audience category");
        default:
        case "everyone":
            return "R".localize("audience category")
    }
};
General.getShortAudienceLabel = function(a) {
    switch (a) {
        case "young":
            return "PG".localize("target audience button content, Y as in young");
        case "mature":
            return "R".localize("target audience button content, M as in mature");
        default:
        case "everyone":
            return "13".localize("target audience button content, E as in everyone")
    }
};


(function(){

	var oldSetupNewGame = GameManager._setupNewGame;
	var newSetupNewGame = function(){
		oldSetupNewGame();
		//Unlock Casual Games Instantly
		GameManager.company.researchCompleted.push(Research.CasualGames);
		//Unlock PG, PG-13, and R rated movies
		GameManager.company.researchCompleted.push(Research.TargetAudience);
	}
	GameManager._setupNewGame = newSetupNewGame;
}();

//Change Genre Names
GameGenre.Action.name = "Action";
GameGenre.Adventure.name = "Drama";
GameGenre.RPG.name = "Romance";
GameGenre.Simulation.name = "Documentary";
GameGenre.Strategy.name = "Musical";
GameGenre.Casual.name = "Comedy";

//Reset all media notifications
Media.allScheduledStories = []

//Reset all topics
Topics.topics = [];

//Reset Consoles
Platforms.allPlatforms = [];

//Overwrite function to say Movie Review instead of Game Review
Reviews.reviewGame = function(a) {
    var b = a.currentGame,
        d = Reviews.rateGame(a),
        c = b.releaseWeek - a.currentWeek;
    a.currentGame.reviews = d;
    d = "The first reviews for our newly released movie, {0}, came in!".localize().format(a.currentGame.title);
    a.notifications.push(new Notification("Movie review".localize("heading"), d, "OK".localize(), c + 0.3));
    a.notifications.push(new Notification("{Reviews}", null, null, c + 0.3));
    0 === a.gameLog.length && a.notifications.push(new Notification("News".localize("heading"), Media.createFirstGameStory(a),
        "OK".localize(), c + 0.7));
    b.flags.sameGenreTopic && (b = Media.createSameGenreTopicStory(a, b)) && (b.weeksUntilFired = c + 1, a.notifications.push(b))
};

Missions.Stage1Missions = [{
    id: "Engine",
    name: "Engine".localize(),
    description: "Improves the game engine.",
    technologyFactor: 0.8,
    designFactor: 0.2,
    genreWeightings: [1, 0.7, 0.7, 0.9, 0.9, 0.6],
    percentage: 100 / 3
}, {
    id: "Gameplay",
    name: "Gameplay".localize(),
    description: "Improves the gameplay.",
    technologyFactor: 0.2,
    designFactor: 0.8,
    genreWeightings: [0.9, 0.8, 0.9, 1, 1, 1],
    percentage: 100 / 3
}, {
    id: "Story/Quests",
	name: "Story/Quests".localize(),
    description: "Work on the story and quests.",
    technologyFactor: 0.2,
    designFactor: 0.8,
    genreWeightings: [0.7, 1, 1, 0.8, 0.8, 0.7],
    percentage: 100 / 3
}];
Missions.Stage2Missions = [{
    id: "Dialogs",
    name: "Dialogues".localize(),
    description: "Work on the dialogues.",
    technologyFactor: 0.1,
    designFactor: 0.9,
    genreWeightings: [0.6, 1, 1, 0.7, 0.7, 0.7],
    percentage: 100 / 3
}, {
    id: "Level Design",
    name: "Level Design".localize(),
    description: "Improves the level design.",
    technologyFactor: 0.6,
    designFactor: 0.4,
    genreWeightings: [0.9, 0.8, 0.9, 0.9, 1, 1],
    percentage: 100 / 3
}, {
    id: "AI",
    name: "Artificial Intelligence".localize(),
    description: "Improves the AI.",
    technologyFactor: 0.8,
    designFactor: 0.2,
    genreWeightings: [1, 0.7, 0.8, 1, 0.9, 0.6],
    percentage: 100 / 3
}];
Missions.Stage3Missions = [{
    id: "World Design",
    name: "World Design".localize(),
    description: "Work on the world design.",
    technologyFactor: 0.4,
    designFactor: 0.6,
    genreWeightings: [0.8, 1, 1, 0.8, 1, 0.7],
    percentage: 100 / 3
}, {
    id: "Graphic",
    name: "Graphic".localize(),
    description: "Improves the graphics.",
    technologyFactor: 0.5,
    designFactor: 0.5,
    genreWeightings: [1, 0.9, 0.9, 1, 0.8, 1],
    percentage: 100 / 3
}, {
    id: "Sound",
    name: "Sound".localize(),
    description: "Improves the sound.",
    technologyFactor: 0.4,
    designFactor: 0.6,
    genreWeightings: [0.9, 0.8, 0.8, 0.9, 0.9, 0.9],
    percentage: 100 / 3
}];

Missions.DevMissions = Missions.Stage1Missions.concat(Missions.Stage2Missions.concat(Missions.Stage3Missions));


//Add new consoles
