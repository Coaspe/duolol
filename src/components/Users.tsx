interface userProps {
    tier: String;
    line: String;
    location: String;

}
const Users = ({tier, line, location} : userProps) => {
    return (
        <div className="grid grid-cols-8">
            <ul className="col-span-8 text-navGray flex gap-3 px-0 text-xs justify-between pt-8 px-2">
                <li>소환사 이름</li>
                <li>주 포지션</li>
                <li>티어</li>
                <li>최근 선호 챔피언</li>
                <li>승률</li>
                <li>KDA</li>
                <li>한마디</li>
                <li>등록일시</li>
            </ul>
        </div>
    )
}

export default Users;