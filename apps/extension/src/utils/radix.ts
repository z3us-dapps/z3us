import BigNumber from 'bignumber.js'

export const stakePercentage = (delegatedStake: string, total: BigNumber) => {
	if (total.eq(0)) {
		return new BigNumber(0)
	}
	return new BigNumber(delegatedStake).shiftedBy(-18).div(total).multipliedBy(100)
}

/*
  https://learn.radixdlt.com/article/how-xrd-staking-emissions-rewards-are-calculated-for-token-holders

  E x S x ( 100 - P ) x ( 100 - F )
  E = This epoch’s total emissions XRD (fixed)
  S = Your stake’s % of total delegated stake (for this epoch)
  P = Penalty % for the node you’ve staked to (for this epoch)
  F = Fee % for the node you’ve staked to (for this epoch)

  So let’s say you are staking 1,000 XRD, and there are currently 1,000,000,000 XRD in total that are staked (out of the total supply of 9,600,000,000 XRD).
  The node you are delegating to has set their validator fee to 2%.
  And that node has 100% participation in consensus (which a good node certainly should achieve!).
  Your share of the rewards for the epoch will be:

  E x 0.000001 x ( 100% ) x ( 98% ) = 0.00000098 of total E

  Over the course of a year of about 300,000,000 XRD emitted,
  this means you would receive 294 XRD – a return of 29.4% APY on your original stake!

  Test function (numbers are shifted by 18)
  console.log(
    calucalteReturn(
      Amount.fromUnsafe('1000000000000000000000')._unsafeUnwrap(),
      Amount.fromUnsafe('1000000000000000000000000000')._unsafeUnwrap(),
      2,
    ).toFormat(2),
  )
*/
const E = 300000000
export const apy = (amount?: BigNumber, total?: BigNumber, fee: number = 0): BigNumber => {
	if (!amount || !total || total.eq(0)) {
		return new BigNumber(0)
	}
	const reward = amount.div(total).multipliedBy((E * (100 - fee)) / 100) // number of tokens gain in a year time

	return reward.div(amount).multipliedBy(100)
}
