

export const getNavContent = (currentUser) => {
    const navContent = [];
    navContent.push({
        label: 'Home',
        to: '/'
    });
    switch (currentUser.role) {
        case 1: //Admin
            navContent.push({
                label: '유저 관리',
                to: '/users'
            })
        case 0: //Leader
            navContent.push({
                label: '콘티 제작',
                to: '/create_worship'
            });
            break;
        case 2: //Member
            navContent.push({
                label: '찬양들',
                to: '/songs'
            })
        
        
    }
    //나중에 자유게시판도 넣음.
    return navContent
}