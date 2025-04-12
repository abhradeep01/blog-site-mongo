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

export {navContent}