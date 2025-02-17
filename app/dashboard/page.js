import StakingApp from '../client-components/stakingapp/StakingApp'
   
export default async function Page({ params }) {
    const lang = (await params).lang
    return <StakingApp/>
}
