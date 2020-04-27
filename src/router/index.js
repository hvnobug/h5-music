import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Recommend = (resolve) => {
    import('../views/Index').then((module) => {
        resolve(module)
    })
}
const Artist = (resolve) => {
    import('../views/Artist').then((module) => {
        resolve(module)
    })
}
const Rank = (resolve) => {
    import('../views/Rank').then((module) => {
        resolve(module)
    })
}
const Search = (resolve) => {
    import('../views/Search').then((module) => {
        resolve(module)
    })
}

const PlaylistDetail = (resolve) => {
    import('../views/PlaylistDetail').then((module) => {
        resolve(module)
    })
}

const RankSongDetail = (resolve) => {
    import('../views/RankSongDetail').then((module) => {
        resolve(module)
    })
}

const SearchResult = (resolve) => {
    import('../views/SearchResult').then((module) => {
        resolve(module)
    })
}
const ArtistTopList = (resolve) => {
    import('../views/ArtistTopList').then((module) => {
        resolve(module)
    })
}


const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: Recommend,
        children: [
            {
                path: ':id',
                component: PlaylistDetail
            }
        ]
    },
    {
        path: '/artist',
        component: Artist,
        children: [
            {
                path: ':id',
                component: ArtistTopList
            }
        ]
    },

    {
        path: '/rank',
        component: Rank,
        children: [
            {
                path: ':id',
                component: RankSongDetail
            }
        ]
    },
    {
        path: '/search',
        component: Search,
        children: [
            {
                path: 'details',
                component: SearchResult
            }
        ]

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
