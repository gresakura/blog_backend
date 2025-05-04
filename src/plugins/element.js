import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Select,
  Option,
  Tag,
  Tree,
  Loading,
  MessageBox,
  Notification,
  RadioGroup,
  Radio,
  RadioButton,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Descriptions,
  DescriptionsItem,
  Link,
  Image,
  Upload,
  Calendar,
  Tabs,
  TabPane,
  Popover
} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Link)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Calendar)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popover)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm