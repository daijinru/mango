import React from 'react'
import {
  ProList,
} from '@ant-design/pro-components'
import { Progress, Tag } from 'antd'
import runner  from '../../../libs/runner'
import { Project, RequestArgs } from '../../../libs/runner.types'
import { useNavigate } from 'react-router-dom'

export default () => {
  const [dataSource, setDataSource] = React.useState<any>()
  const navigate = useNavigate()
  React.useEffect(() => {
    (async function() {
      const response = await runner.HttpUtils.get<RequestArgs, Project[]>({
        url: '/v1/project/all',
      })
      setDataSource(response.data.map(item => {
        return {
          title: item.name,
          data: item,
          subTitle: <Tag color="#5BD8A6">{item.path}</Tag>,
          actions: [<a key="run">Run</a>, <a key="delete">Remove</a>],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 200,
                }}
              >
                <div>Developing</div>
                <Progress percent={80} />
              </div>
            </div>
          ),
        }
      }))
    })()
  }, [])
  return (
    <div
      style={{
        backgroundColor: 'transparent',
        margin: -24,
        padding: 24,
      }}
    >
      <ProList<any>
        ghost={true}
        itemCardProps={{
          ghost: true,
        }}
        // pagination={{
        //   defaultPageSize: 8,
        //   showSizeChanger: false,
        // }}
        showActions="hover"
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onClick: () => {
              record.data?.id && navigate('/project?id=' + record.data.id)
            },
          }
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        headerTitle="Projects"
        dataSource={dataSource}
      />
    </div>
  )
}

