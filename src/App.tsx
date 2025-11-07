import { memo, useState } from 'react'
import { ThemeProvider } from '@calm-ui/theme'
import { Button, IconButton } from '@calm-ui/button'
import { Dialog, DialogAutoFocus, DialogClose, Drawer, DrawerClose } from '@calm-ui/modal'
import { Pagination } from '@calm-ui/pagination'
import { Input, Textarea } from '@calm-ui/input'
import { Switch } from '@calm-ui/switch'
import { Checkbox } from '@calm-ui/checkbox'
import { Radio, RadioGroup } from '@calm-ui/radio-group'
import { Cascader, Combobox, TreeSelect } from '@calm-ui/select'
import { Popover, PopoverClose } from '@calm-ui/popover'
import { Tooltip } from '@calm-ui/tooltip'
import pca from './china-pca.json'

const options = [
  {
    value: 'kale',
    name: '卡了',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale2',
    name: '卡了2',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale3',
    name: '卡了3',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale4',
    name: '卡了4',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale5',
    name: '卡了5',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale6',
    name: '卡了6',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale7',
    name: '卡了7',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale8',
    name: '卡了8',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale9',
    name: '卡了9',
    data: '靠靠靠靠靠靠靠',
  },
  {
    value: 'kale10',
    name: '卡了410'
  },
  {
    value: 'kale11',
    name: '卡了211'
  },
  {
    value: 'kale12',
    name: '卡了312'
  },
  {
    value: 'kale13',
    name: '卡了413卡了413卡了413卡了413卡了413卡了413卡了413卡了413卡了413'
  },
]

const Log = memo(() => {
  console.log('log')
  return '不随抽屉关闭而销毁的子组件'
})

const COLORS = ['#058373','#0B58D2','#fb7185']

const App = () => {
  const [primaryColor, setPrimaryColor] = useState(COLORS.at(-1))

  const [checkboxChecked, setCheckboxChecked] = useState<boolean|'indeterminate'>('indeterminate')
  const [selectValue, setSelectValue] = useState('')
  const [MSelectValue, setMSelectValue] = useState<string>('')

  const [perPage, setPerPage] = useState(20)
  const [page, setPage] = useState(1)
  
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  return <>
    <ThemeProvider value={{
      palette: {
        primary: primaryColor,
      },
    }}>
      <div className="p-32px">
        <p>主题色</p>
        <div className="flex gap-8px mt-8px">
          {
            COLORS.map((c) => <Button theme={c} key={c} onClick={() => setPrimaryColor(c)} outlined={primaryColor!==c}>{c}</Button>)
          }
        </div>
      </div>
      <div className="p-32px">
        <div className='flex items-center gap-12px'>
          <p>normal button</p>
          <Button theme='primary' loading>Primary Loading</Button>
          <Button theme='danger' disabled>Danger disabled</Button>
          <Button theme='success'>
            Success
            <svg xmlns="http://www.w3.org/2000/svg" className='ml-8px' width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"></path></svg>
          </Button>
          <Button theme='warning'>Warning</Button>
          <Button theme='default'>Default</Button>
        </div>
        <div className='p-32px'>
          <label htmlFor='mselect'>TreeMelect：</label>
          <TreeSelect disabled id='mselect' placeholder='请选择' value={MSelectValue} onValueChange={setMSelectValue} name='select' options={[
            {
              "value": "8da989ea-86be-42b8-be96-f20fde95f7f0",
              "name": "1",
              "children": [
                {
                  "value": "9964d5ab-6198-40a2-8e1c-5ccd877447c3",
                  "name": "1-1",
                  "children": [
                    {
                      "value": "a55a92d8-5491-4052-8e4f-bb8b5f829702",
                      "name": "1-1-1",
                      "children": []
                    },
                    {
                      "value": "eafdb6ae-20ec-4d7c-865a-6a0fed673020",
                      "name": "1-1-2开始大家客户反馈及时的反馈好看科技手段和反馈速度快发货快",
                      "children": []
                    }
                  ]
                },
                {
                  "value": "aa8dcfb5-5e50-4015-bead-23924f4ea63c",
                  "name": "1-2",
                  "children": []
                },
                {
                  "value": "fe0a9ff7-afd4-4430-b7d1-6004aa71c9b3",
                  "name": "1-3",
                  "children": []
                }
              ]
            },
            {
              "value": "3992fa11-6e54-403d-93b2-f524a4333e07",
              "name": "2",
              disabled: true,
              "children": [
                {
                  "value": "23cbd533-9cc6-42d3-a95f-efbc3b114b24",
                  "name": "2-1",
                  "children": []
                }
              ]
            }
          ]} />
          <Cascader
            className='w-320px'
            options={pca}
            // open
            placeholder='请选择'
            loading
            allowClear
            showSearch
            // checkable
            // checkable
            // disabled
          >
          </Cascader>
        </div>
        <div className="p-32px">
          <div className='flex items-center gap-12px flex-wrap relative'>
            <p>normal button</p>
            <Button theme='primary' className='font-500 text-32px'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                <g fill="none">
                  <path fill="#86d72f" d="M29.84 15.92C29.84 23.61 18.92 30 15.92 30S2 23.61 2 15.92S8.23 2 15.92 2s13.92 6.23 13.92 13.92"></path>
                  <path fill="#212121" d="M13.368 24.225a1 1 0 0 1 1.407.143c.376.461.825.645 1.225.645s.85-.184 1.225-.645a1 1 0 1 1 1.55 1.264c-.724.889-1.726 1.38-2.775 1.38c-1.05 0-2.05-.491-2.775-1.38a1 1 0 0 1 .143-1.407"></path>
                  <path fill="#533566" d="M6.474 19.527c2.254 2.253 4.6 3.549 6.845 1.306c2.253-2.242 2.233-5.905-.01-8.147c-2.244-2.243-5.898-2.253-8.142 0s-.946 4.588 1.307 6.84m19.051.001c-2.255 2.253-4.602 3.549-6.847 1.306s-2.234-5.905.01-8.147c2.245-2.243 5.9-2.253 8.144 0c2.245 2.253.947 4.588-1.307 6.84"></path>
                  <path fill="#fff" d="M12.62 15.62c.61-.61.47-1.73-.31-2.51c-.78-.77-1.9-.92-2.51-.31s-.47 1.73.31 2.51s1.9.92 2.51.31m13.28 0c.61-.61.47-1.73-.31-2.51c-.77-.77-1.9-.92-2.51-.31s-.47 1.73.31 2.51s1.9.92 2.51.31"></path>
                </g>
              </svg>
              Primary
            </Button>
            <Button theme='danger' onClick={() => setOpen(true)}>Dialog</Button>
            <Button theme='success' onClick={() => setOpen2(true)}>Drawer KeepMount</Button>
            <Button theme='warning'>GO</Button>
            <Button theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>outlined button</p>
            <Button outlined theme='primary' className='text-32px fontmono'>GO</Button>
            <Button outlined theme='danger' className='bg-white'>GO</Button>
            <Button outlined theme='success'>
              <Popover
                content={
                  <div className='p-64px rounded border'>
                    <p>1231234512345</p>
                    <Input placeholder='请输入' />
                    <PopoverClose>close</PopoverClose>
                  </div>
                }
                placement='bottom-end'
              >
                <span tabIndex={0} onClick={(e) => e.stopPropagation()}>Button内span触发 Popover</span>
              </Popover>
            </Button>
            <Button outlined theme='warning' loading>LOADING BUTTON</Button>
            <Button outlined theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>text button</p>
            <Tooltip enterable content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?' placement='top-start'>
              <Button text theme='primary' className='max-w-120px'><span className='truncate'>可移入的Tooltip Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?</span></Button>
            </Tooltip>
            <Tooltip content='tooltip' placement='bottom' delay={0}>
              <Button text theme='danger'>直接显示的Tooltip</Button>
            </Tooltip>
            <Button text theme='success'>GO</Button>
            <Button text theme='warning'>GO</Button>
            <Button text theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>tag button</p>
            <Button tag theme='primary'>GO</Button>
            <Button tag theme='danger'>GO</Button>
            <Button tag theme='success'>GO</Button>
            <Button tag theme='warning'>GO</Button>
            <Button tag theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>icon button</p>
            <IconButton theme='primary'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
              </svg>
            </IconButton>
            <IconButton theme='danger'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
              </svg>
            </IconButton>
            <IconButton theme='success'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
              </svg>
            </IconButton>
            <IconButton theme='warning'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
              </svg>
            </IconButton>
            <IconButton theme='default'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
              </svg>
            </IconButton>
          </div>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>text button</p>
          <Button text theme='primary'>Primary</Button>
          <Button text theme='danger'>Danger</Button>
          <Button text theme='success'>Success</Button>
          <Button text theme='warning'>Warning</Button>
          <Button text theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>tag button</p>
          <Button tag theme='primary'>Primary</Button>
          <Button tag theme='danger'>Danger</Button>
          <Button tag theme='success'>Success</Button>
          <Button tag theme='warning'>Warning</Button>
          <Button tag theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>icon button</p>
          <IconButton theme='primary'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='danger'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='success'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='warning'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='default'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
        </div>
      </div>
      <div className='flex p-32px'>
        <form className="border p-32px" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='input' className='w-6rem text-right'>Input：</label>
          <Input name='input' id='input' value={'sdsdsdsd'} disabled />
          <br />
          <label htmlFor='textarea' className='w-6rem text-right'>Textarea：</label>
          <Textarea name='textarea' id='textarea' value={'sdsdsdsd'} disabled />
          <br />
          <label htmlFor='switch'>switch</label>
          <br />
          <Switch name='switch' id='switch' value='switch' />
          <br />
          <br />
          <label htmlFor="checkbox">checkbox</label>
          <br />
          <Checkbox name='checkbox' id='checkbox' value='checkbox' checked={checkboxChecked} onCheckedChange={setCheckboxChecked} size={48} />
          <br />
          <br />
          <p>radio group</p>
          <RadioGroup name='radio' className='flex items-center'>
            <Radio id='kale1' value='kale' size={48} />
            <label htmlFor="kale1">卡了1</label>
            <Radio id='kale2' value='kale2' />
            <label htmlFor="kale2">卡了2</label>
            <Radio id='kale3' value='kale3' />
            <label htmlFor="kale3">卡了3</label>
            <Radio id='kale4' value='kale4' />
            <label htmlFor="kale4">卡了4</label>
          </RadioGroup>
          <br />
          <label htmlFor='select'>Select：</label>
          <Combobox placeholder='combobox' options={options} value={selectValue} className='w-120px!' allowClear onClear={() => setSelectValue('')} hiddenWhenNoOptions optionRender={(option) => {
            return <div className='w-120px truncate'>{option.name}</div>
          }} onSelectOption={(value) => {
            console.log(value)
            setSelectValue(value.value)
          }} />
          <br />
          <br />
          <Button type='submit'>SUBMIT</Button>
        </form>
      </div>
      <div className='p-32px'>
        <p>pagination</p>
        <br />
        <Pagination perPage={perPage} onPerPageChange={setPerPage} total={1000} page={page} onPageChange={setPage} />
      </div>
    </ThemeProvider>
    <Drawer open={open2} onOpenChange={setOpen2} zIndex={1000} keepMount overlay={false}>
      <div style={{width:320,height:100,backgroundColor:'black'}}></div>
      <DrawerClose />
      <Log />
    </Drawer>
    <Dialog open={open} onOpenChange={setOpen}>
      <div style={{padding:32}}>
        <DialogClose />
        <DialogClose asChild>
          <Button theme='default' outlined>自关闭</Button>
        </DialogClose>
        <p>安全的autoFocus</p>
        <DialogAutoFocus>
          <Textarea rows={5} placeholder={`1
  2
  3
  4
  5`} className='w-520px' />
        </DialogAutoFocus>
      </div>
    </Dialog>
  </>
}

export default App
