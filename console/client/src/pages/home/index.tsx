import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard.Group
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue="A"
  >
    <CheckCard title="Create A Project" description="to create a project" value="action_create" />
    <CheckCard title="Go to projects" description="go to see the projects" value="action_projects" />
    {/* <CheckCard
      title="Card C"
      disabled
      description="选项三，这是一个不可选项"
      value="C"
    /> */}
  </CheckCard.Group>
);
