const navContent = [
    {
        text:"home",
        path:function(){
            return `/`
        }
    },
    {
        text:"trending",
        path:function(){
            return `/${this.text}`
        }
    },
    {
        text:"most popular",
        path:function(){
            return `/${this.text}`
        }
    },
    {
        text:"about",
        path:function(){
            return `/${this.text}`
        }
    },
]

const categories = [
    {
        text:"all posts",
        path:function(){
            return `/`
        }
    },
    {
        text:"development",
        path:function(){
            return `?cat=${this.text}`
        }
    },
    {
        text:"web design",
        path:function(){
            return `?cat=${this.text}`
        }
    },
    {
        text:"database",
        path:function(){
            return `?cat=${this.text}`
        }
    },
    {
        text:"digital marketing",
        path:function(){
            return `?cat=${this.text}`
        }
    },
    {
        text:"ai & ml",
        path:function(){
            return `?cat=${this.text}`.replaceAll(" ","")
        }
    }
]

export {
    navContent,
    categories
}