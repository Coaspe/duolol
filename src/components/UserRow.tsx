import { seed, userInfo} from "../types";

const UserRow = (user: any) => {
    return (
        <div className="col-span-8 grid grid-cols-8 gap-3">
            <div className="flex justify-center col-span-1 items-center">
                <img
                    className="w-9 h-9"
                    src="/logo192.png"
                    alt="summonerIcon"
                />
                <div className="flex items-center h-2">
                    <span className="text-white">{seed.summonerName}</span>
                </div>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>{seed.mainPosition}</span>
            </div>

            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>{seed.tier}</span>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>선호 챔피언</span>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>{seed.winRate * 100}%</span>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                <span>{seed.KDA[0]}/</span>
                <span>{seed.KDA[1]}/</span>
                <span>{seed.KDA[2]}/</span>
                <span>{((seed.KDA[0]+seed.KDA[2]) / seed.KDA[1]).toFixed(2)}</span>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>{seed.comment}</span>
            </div>
            <div className="col-span-1 text-white items-center flex justify-center">
                    <span>{seed.registrationDate}</span>
            </div>
        </div>
    );                      
}

export default UserRow;