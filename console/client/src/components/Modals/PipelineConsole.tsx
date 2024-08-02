import React from 'react'
import {ModalRootConfig} from "./index"
import { Steps } from "antd"
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'

const App: React.FC<ModalRootConfig> = ({ args, NAME, open, close }) => {
  return  (
    <>
      <div>
        <Steps
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Pay',
              status: 'process',
              icon: <LoadingOutlined />,
            },
            {
              title: 'Done',
              status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
      </div>
      <div>

      </div>
    </>
  )
}

export default {
  NAME: 'Pipeline Console',
  component: App,
}

