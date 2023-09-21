import { Label, Icon } from "semantic-ui-react"

export default (status: string) => {
  return (
    <>
      {
        status === 'failed'
        ? <Label as='a' color='red' image><Icon name="times" />FAILED</Label>
        : <Label as='a' color='green' image><Icon name="hand peace" />SUCCESS</Label>
      }
    </>
  )
}