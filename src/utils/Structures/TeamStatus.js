
class TeamStatus {
    static Out = new TeamStatus(-1, 'out', "Out", "is out!", false)
    static Playing = new TeamStatus(0, 'playing', "Playing", "is playing", true)
    static LooserKing = new TeamStatus(1, 'looser-king', "Loser King", "is the loser king!", false)
    static SecondPlace = new TeamStatus(2, 'second-place', "2nd Place", "took 2nd place!", false)
    static Champion = new TeamStatus(3, "first-place", "Champion", "is the champion!", false)

    constructor(teamStatus, key, headline, fullMessage, isPlaying) {
        this.Level = teamStatus
        this.Key = key
        this.Headline = headline
        this.Playing = isPlaying
        this.getTeamMessage = (teamName = '') => `${teamName} ${fullMessage}`
    }
}

export default TeamStatus
