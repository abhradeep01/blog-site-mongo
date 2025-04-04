import { DownloadIcon, ReportIcon } from "./icons";

const categories = [
    {
        text:'all posts',
        path:function (){
            return `/`
        }
    },
    {
        text:'web design',
        path:function (){
            return `?cat=${this.text}`
        }
    },
    {
        text:'development',
        path:function (){
            return `/?cat=${this.text}`
        }
    },
    {
        text:'databases',
        path:function (){
            return `/?cat=${this.text}`
        }
    },
    {
        text:'ai/ml',
        path:function (){
            return `/?cat=${this.text}`
        }
    },
    {
        text:'search engines',
        path:function (){
            return `/?cat=${this.text}`
        }
    },
    {
        text:'digital marketing',
        path:function (){
            return `/?cat=${this.text}`
        }
    },
]

const navs=[
    {
        text:'home',
        path:'/'
    },
    {
        text:'trending',
        path:'/trending'
    },
    {
        text:'most popular',
        path:'/most popular'
    },
    {
        text:'about',
        path:'/about'
    }
]

const threeDotContent = [
    {
        text:"download",
        icon:<DownloadIcon />,
        color:"text-green-700"
    },
    {
        text:"report",
        icon: <ReportIcon/>,
        color:"text-rose-500"
    }
]

const profileRoutes = [
    {
        text:"posts",
        path:function(){
            return '/'
        }
    },
    {
        text:"saved",
        path:function(){
            return `/${this.text}`
        }
    },
    {
        text:"liked",
        path:function(){
            return `/${this.text}`
        }
    }
]

export {categories,navs,threeDotContent,profileRoutes}