interface UserRowProps{
    userInfo: {
        username: String;
        mainPosition: String;
        tier: String;
        recentPreferChampions: Array<String>;
        winningRate: String
        kda: String;
        comment: String;
        registrationDate: Date;
    }
}
const UserRow = ({ userInfo } : UserRowProps) => {

}

export default UserRow;