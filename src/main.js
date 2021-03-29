import API from './api.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

// POST = CREATE
// PUT  = UPDATA
// DELETE = Delete
// GET = READ

//This url may need to change depending on what port your backend is running
//on.
const api = new API('http://localhost:5000');


/*********  global variable **********/
var Login_token = 0;
var circle_point = [];
var like_unlike = [];
var dict = new Array();
var dict_length;
var whole_post;
var following_num = 0;
var followed_num = 0;
var username = 0;
var id = 0;
var name = 0;
var post = 0;
var email = 0;
var self_token_following = 0;
var username = 0;
var Profile_username_email = 0;
var profile_following_num = 0;
var profile_followers_num = 0;
var profile_post_num = 0;
var now_my_post = 0;
var search_first_people_username;
var following_id;
var following_name_list = '';






/*********  Sign and Login button **********/
const sign_up = document.getElementById("sign_up");
const log_in = document.getElementById("log_in");
const back_to_Log_in = document.getElementById("back_to_Log_in");
const submit_buttom = document.getElementById("submit_buttom");
const Profile = document.getElementById("Profile");
const home_page = document.getElementById("home_page");
const edit_yourself = document.getElementById("edit_yourself");
const area_search_button = document.getElementById("area_search");
const confirm_for_small_box = document.getElementById("confirm_for_small_box");
const search_for_small_box = document.getElementById("search_for_small_box");
const follow_other = document.getElementById("follow_other");
const following_button = document.getElementById("following_button");
const Log_out_buttom = document.getElementById("Log_out_buttom");
const New_Post = document.getElementById("New_Post");
const post_picture = document.getElementById("post_picture");
const send_post = document.getElementById("send_post");
const cancel_post = document.getElementById("cancel_post");





/*********  Sign and Login information **********/
const login_Username = document.getElementById("login_Usersname");
const login_Passward = document.getElementById("login_Passward");
const login_confirm_Passward = document.getElementById("login_confirm_Passward");
const sign_in_Username = document.getElementById("sign_in_Username")
const sign_in_password = document.getElementById("sign_in_password");
const sign_in_confirmed_password = document.getElementById("sign_in_confirmed_password");
const sign_in_Email = document.getElementById("sign_in_Email");
const sign_in_Name = document.getElementById("sign_in_Name");
const profile_information = document.getElementById("profile_information");
var login_new_Usersname = document.getElementById("login_new_Usersname");
var login_new_Email = document.getElementById("login_new_Email");
var login_new_PassWord = document.getElementById("login_new_PassWord");
var what_the_Usersname = document.getElementById("what_the_Usersname");
var profile_username = document.getElementById("profile_username");
var profile_Email = document.getElementById("profile_Email");
var profile_following = document.getElementById("profile_following");
var profile_followers = document.getElementById("profile_followers");
var profile_Post = document.getElementById("profile_Post");
var Your = document.getElementById("Your");
var following_s_people_name = document.getElementById("following_s_people_name");
var new_post_text = document.getElementById("new-post-text");



/*********  Sign and Login lookout **********/
const show_left_login = document.getElementById("show_left_login");
const show_right_login = document.getElementById("show_right_login");
const show_left_sign = document.getElementById("show_left_sign");
const show_right_sign = document.getElementById("show_right_sign");
const show_left_sign_2 = document.getElementById("show_left_sign_2");
const show_right_already_login = document.getElementById("show_right_already_login");
const show_left_already_login = document.getElementById("show_left_already_login");
const Show_Success = document.getElementById("Show_Success");
const main_post_area = document.getElementById("main_post_area");
const others_profile_main_post_area = document.getElementById("others_profile_main_post_area");
const show_follow_people_name = document.getElementById("show_follow_people_name");
const the_comment_yousent = document.getElementById("the_comment_yousent");
var modal = document.getElementById("myModal");
var closebutton = document.getElementById("closebutton");
var edit_part = document.getElementById("edit_part");
var search_part = document.getElementById("search_part");


sign_up.addEventListener('click', event => {
    show_right_login.style.display = 'none';
    show_left_login.style.display = 'none';
    show_left_sign.style.display = 'flex';
    show_right_sign.style.display = 'flex';
    show_left_sign_2.style.display = 'flex';
    main_post_area.style.display = 'none';
})

back_to_Log_in.addEventListener('click', event => {
    show_right_login.style.display = 'flex';
    show_left_login.style.display = 'flex';
    show_left_sign.style.display = 'none';
    show_right_sign.style.display = 'none';
    show_left_sign_2.style.display = 'none';
    sign_in_Username.value = " ";
    sign_in_password.value = " ";
    sign_in_confirmed_password.value = " ";
    sign_in_Email.value = " ";
    sign_in_Name.value = " ";
    Show_Success.style.display = "none";
    main_post_area.style.display = 'none';
})



/*********  bacis function  **********/
function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

const loadfeed_two = () => {
    const result = fetch("http://localhost:5000/user/feed?p=0&n=10", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + Login_token,
        },
    }).then(data => {
        if (data.status != 200) {
            data.json().then(result => {})
        } else if (data.status == 200) {
            data.json().then(result => {
                dict_length = result["posts"].length;
                for (let i = 0; i < dict_length; i++) {
                    dict[i] = "Like";
                }
            })
        }
    })
}

const submit_comment = (comment_content, post_id) => {
    // console.log(post_id);
    const comment_send = {
        "comment": comment_content
    }
    return fetch("http://localhost:5000/post/comment?id=" + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token
            },
            body: JSON.stringify(comment_send)
        })
        .then(data => {
            if (data.status != 200) {
                data.json()
                    .then(result => {
                        // console.log(result);
                        alert(result["msg"]);
                    })
            } else if (data.status == 200) {
                data.json()
                    .then(result => {
                        alert("SUCCESS")
                        modal.style.display = "none";
                        loadfeed();
                    })
            }
        })
}



const submit_comment_myself = (comment_content, post_id) => {
    // console.log(post_id);
    const comment_send = {
        "comment": comment_content
    }
    return fetch("http://localhost:5000/post/comment?id=" + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token
            },
            body: JSON.stringify(comment_send)
        })
        .then(data => {
            if (data.status != 200) {
                data.json()
                    .then(result => {
                        // console.log(result);
                        alert(result["msg"]);
                    })
            } else if (data.status == 200) {
                data.json()
                    .then(result => {
                        alert("SUCCESS")
                        modal.style.display = "none";
                        profile_my_self();
                    })
            }
        })
}


function TimeCalcute(time) {
    var date = new Date(time * 1000)
    var detail_time;
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return detail_time = Y + M + D + h + m + s;
}



const load_user_information = () => {
    // console.log("Loading user information");
    // const result = 
    return fetch("http://localhost:5000/user", {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + Login_token,
                "username": login_Username.value,
            },
        }).then(data => {
            if (data.status != 200) {
                return data.json()
                    .then(result => {
                        // console.log(result);
                        alert(result["message"]);
                    })
            } else if (data.status == 200) {
                return data.json();
            }
        })
        .then(result => {
            id = result["id"];
            name = result["name"];
            username = result["username"];
            followed_num = result["followed_num"];
            // console.log(followed_num);
            post = result["posts"].length;
            // console.log(post);
            following_num = result["following"];
            self_token_following = result["following"];
            // console.log(following_num);
            email = result["email"];
            // console.log(email);
            return result;
        })
}





const load_user_own_post = (id) => {
    // console.log("Loading user own post information");
    return fetch("http://localhost:5000/post?id=" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + Login_token,
        },
    }).then(data => {
        if (data.status != 200) {
            return data.json()
                .then(result => {
                    // console.log(result);
                    alert(result["message"]);
                })
        } else if (data.status == 200) {
            return data.json()
                .then(result => {
                    return result;
                })
        }
    })

}




/************  SHOW BASIC FEED ***************/
const loadfeed = () => {
    profile_main_post_area.style.display = 'none';
    post_picture.style.display = "none";
    // console.log("Loading Feed");
    const result = fetch("http://localhost:5000/user/feed?p=0&n=10", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + Login_token,
        },
    }).then(data => {
        if (data.status != 200) {
            data.json().then(result => {
                // console.log(result);
                alert(result["message"]);
            })
        }
        /************  SHOW FEED ***************/
        else if (data.status == 200) {

            main_post_area.style.display = "block";

            var author_id_list = []
            data.json()
                .then(result => {
                    whole_post = result["posts"];

                    // console.log(result);
                    if (document.getElementById("main_post_area").hasChildNodes()) {
                        document.getElementById("main_post_area").innerHTML = "";
                    }
                    for (var i = 0; i < result["posts"].length; i++) {
                        // console.log(i);
                        // post container添加
                        var postBox = document.createElement('div');
                        var authorBox = document.createElement('div');
                        var open_authorBox = document.createElement('button');
                        var imagebox = document.createElement('div');
                        var inserimage = document.createElement('img');
                        var Like_and_comment_box = document.createElement('div');
                        var like_box = document.createElement('button');
                        const comment_box = document.createElement('button');
                        const comment_input = document.createElement('input');
                        const comment_box_area = document.createElement('div');
                        var discription_box = document.createElement('div');
                        var imageboxsrc;
                        var count_div_like = document.createElement('p');
                        const count_div_comment = document.createElement('p');
                        var time_box = document.createElement('div');
                        var id_box = document.createElement('p');
                        var small_comment_respectively = document.createElement('div');
                        var who_like_the_pos_box = document.createElement('p');
                        var red_heart = document.createElement('div');


                        postBox.classList.add('small_sub_area_post');
                        authorBox.classList.add("a_author_area");
                        open_authorBox.classList.add("a_author_picture");
                        count_div_like.classList.add("count_div_comment");
                        count_div_comment.classList.add("count_div_comment");
                        id_box.classList.add("count_div_comment");
                        who_like_the_pos_box.classList.add("count_div_comment");

                        imagebox.classList.add("images_style");
                        discription_box.classList.add("discription_area");
                        like_box.classList.add('login_area_like');
                        comment_box.classList.add("login_area_like");
                        Like_and_comment_box.classList.add("comment_like_style");
                        comment_box_area.classList.add("comment_area");
                        inserimage.classList.add("image_insert");
                        time_box.classList.add("time_div_comment");
                        small_comment_respectively.classList.add("small_comment_respectively");
                        red_heart.classList.add("the_number_of_people_like");


                        for (var key in dict) {
                            if (key == i) {
                                if (dict[key] == "Like") {
                                    like_box.innerText = "Like";
                                }
                                if (dict[key] == "UnLike") {
                                    like_box.innerText = "UnLike";
                                }
                            }
                        }
                        comment_box.innerText = "Comment";
                        open_authorBox.innerText = "Open";




                        var Likes = result["posts"][i]["meta"]["likes"].length;
                        const comments = result["posts"][i]["comments"].length;
                        var time = result["posts"][i]["meta"]["published"];
                        const post_id = result["posts"][i]["id"];
                        const who_like_the_post = result["posts"][i]["meta"]["likes"];
                        for (let j = 0; j < result["posts"][i]["comments"].length; j++) {
                            var comments_detail_username_box = document.createElement('div');
                            var comments_detail_comment_box = document.createElement('div');
                            var comments_detail_time_box = document.createElement('div');
                            var another_box = document.createElement('div');

                            comments_detail_username_box.classList.add("small_information");
                            comments_detail_comment_box.classList.add("small_information_comment");
                            comments_detail_time_box.classList.add("small_information_time");
                            another_box.classList.add("another_box_style");

                            var comments_detail = result["posts"][i]["comments"][j];
                            var comments_detail_username = result["posts"][i]["comments"][j]['author'];
                            var comments_detail_comment = result["posts"][i]["comments"][j]['comment'];
                            var comments_detail_time = result["posts"][i]["comments"][j]['published'];
                            //alert(comments_detail);
                            // console.log(comments_detail);
                            var detail_time = TimeCalcute(comments_detail_time);
                            comments_detail_username_box.innerText = comments_detail_username + ":";
                            comments_detail_comment_box.innerText = comments_detail_comment;
                            comments_detail_time_box.innerText = detail_time;
                            another_box.appendChild(comments_detail_username_box);
                            another_box.appendChild(comments_detail_comment_box);
                            another_box.appendChild(comments_detail_time_box);
                            small_comment_respectively.appendChild(another_box);
                            comment_box_area.appendChild(small_comment_respectively);
                            // console.log(comment_box_area);
                        }
                        // console.log(comment_box_area);

                        detail_time = TimeCalcute(time);


                        count_div_like.innerText = Likes;
                        count_div_comment.innerText = comments;
                        time_box.innerText = detail_time;
                        id_box.innerText = post_id;
                        who_like_the_pos_box.innerText = who_like_the_post;



                        authorBox.innerText = result["posts"][i]["meta"]["author"];
                        discription_box.innerText = result["posts"][i]["meta"]["description_text"];



                        imageboxsrc = result["posts"][i]["thumbnail"];
                        inserimage.setAttribute('src', `data:image/jpeg;base64, ${imageboxsrc}`);
                        // console.log("yes!! I'm comment")
                        // console.log(comments);
                        // comment_box_area.innerText = comments;

                        Like_and_comment_box.appendChild(like_box);
                        Like_and_comment_box.appendChild(count_div_like);
                        Like_and_comment_box.appendChild(comment_input);
                        comment_box.addEventListener('click', event => submit_comment(comment_input.value, post_id));


                        Like_and_comment_box.appendChild(comment_box);
                        Like_and_comment_box.appendChild(count_div_comment);
                        Like_and_comment_box.appendChild(time_box);
                        id_box.style.display = "none";
                        who_like_the_pos_box.style.display = "none";
                        comment_box_area.style.overflowX = "scroll";
                        discription_box.style.overflowX = "scroll";





                        imagebox.appendChild(inserimage);
                        imagebox.appendChild(id_box);
                        imagebox.appendChild(who_like_the_pos_box);
                        postBox.appendChild(authorBox);
                        postBox.appendChild(open_authorBox);
                        // discription_box.style.overflowX = "scroll";
                        postBox.appendChild(imagebox);
                        postBox.appendChild(discription_box);
                        postBox.appendChild(Like_and_comment_box);

                        postBox.appendChild(red_heart);

                        postBox.appendChild(comment_box_area);
                        document.getElementById("main_post_area").appendChild(postBox);
                    }

                    /////like_button_
                    var ChildNode_test = document.getElementById("main_post_area").childNodes;
                    for (let i = 0; i < result["posts"].length; i++) {
                        var childNodes_like_button = ChildNode_test[i].childNodes[4].childNodes[0];
                        // console.log(childNodes_like_button);

                        if (ChildNode_test[i].childNodes[4].childNodes[0].textContent == "Like") {
                            circle_point.length = 0;
                            like_unlike.length = 0;
                            childNodes_like_button.addEventListener('click', () => {
                                var B = 0;
                                var word = ChildNode_test[i].childNodes[2].childNodes[2].textContent;
                                B = word.split(',');

                                load_user_information()
                                    .then(result => {

                                        // console.log(isInArray(B, String(result["id"])));
                                        if (isInArray(B, String(result["id"])) == true) {
                                            alert("You have been Liked it !");
                                            ChildNode_test[i].childNodes[4].childNodes[0].innerText = "UnLike";
                                            dict[i] = "UnLike";

                                            load_user_information();
                                            loadfeed();
                                        } else {
                                            // console.log(ChildNode_test[i].childNodes[2].childNodes[1].textContent);
                                            const result = fetch("http://localhost:5000/post/like?id=" + ChildNode_test[i].childNodes[2].childNodes[1].textContent, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Token ' + Login_token
                                                },
                                            }).then(data => {
                                                if (data.status != 200) {
                                                    data.json()
                                                        .then(result => {
                                                            // console.log(result);
                                                            alert(result["msg"]);
                                                        })
                                                } else if (data.status == 200) {
                                                    data.json()
                                                        .then(result => {
                                                            alert("SUCCESS");
                                                            ChildNode_test[i].childNodes[4].childNodes[0].textContent = "Unlike";
                                                            dict[i] = "UnLike";

                                                            // console.log(circle_point);
                                                            load_user_information().
                                                            then(result => {
                                                                // console.log(result);
                                                                loadfeed();
                                                            })

                                                        })
                                                }
                                            })
                                        }
                                    })
                            })
                        } else if (ChildNode_test[i].childNodes[4].childNodes[0].textContent == "UnLike") {
                            circle_point.length = 0;
                            like_unlike.length = 0;
                            childNodes_like_button.addEventListener('click', () => {
                                var B = ''
                                var word = ChildNode_test[i].childNodes[2].childNodes[2].textContent;
                                B = word.split(',');
                                load_user_information()
                                    .then(result => {
                                        // console.log(isInArray(B, String(result["id"])));
                                        if (isInArray(B, String(result["id"])) == false) {
                                            alert("You have been DisLiked it !");
                                            ChildNode_test[i].childNodes[4].childNodes[0].innerText = "Like";
                                            dict[i] = "Like";
                                            load_user_information();
                                            loadfeed();
                                        } else {
                                            // console.log(ChildNode_test[i].childNodes[2].childNodes[1].textContent);
                                            const result = fetch("http://localhost:5000/post/unlike?id=" + ChildNode_test[i].childNodes[2].childNodes[1].textContent, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Token ' + Login_token
                                                },
                                            }).then(data => {
                                                if (data.status != 200) {
                                                    data.json()
                                                        .then(result => {
                                                            // console.log(result);
                                                            alert(result["msg"]);
                                                        })
                                                } else if (data.status == 200) {
                                                    data.json()
                                                        .then(result => {
                                                            alert("SUCCESS");
                                                            ChildNode_test[i].childNodes[4].childNodes[0].textContent = "Like";
                                                            dict[i] = "Like";
                                                            // console.log(circle_point);
                                                            load_user_information().
                                                            then(result => {
                                                                // console.log(result);
                                                                loadfeed();
                                                            })
                                                        })
                                                }
                                            })
                                        }
                                    })
                            })
                        }

                    }
                    ////////////////////////////打开作者页面功能键/////////////////////////////////////
                    for (let i = 0; i < result["posts"].length; i++) {
                        var childNodes_open_button = ChildNode_test[i].childNodes[1];
                        // console.log(childNodes_open_button);
                        childNodes_open_button.addEventListener('click', () => {
                            search_functin_detial("username", ChildNode_test[i].childNodes[0].textContent);

                        })

                    }

                });

        }
        // console.log(data);
    })
}


/************  SHOW Profile FEED ***************/
const profile_my_self = () => {

    load_user_information()
        .then(result => {
            profile_Post.textContent = result["posts"].length;
        });

    word_text.style.display = "none";
    profile_information.style.display = "flex";
    edit_yourself.style.display = "flex";
    follow_other.textContent = "follow";
    profile_main_post_area.style.display = "block"
    main_post_area.style.display = "none";
    others_profile_main_post_area.style.display = "none";
    post_picture.style.display = "none";

    username = login_Username.value;
    Profile_username_email = email;
    profile_following_num = following_num.length;
    profile_followers_num = followed_num;
    profile_post_num = post.length;
    // console.log("profile_post_num" + profile_post_num);

    profile_username.textContent = username;
    profile_Email.textContent = Profile_username_email;
    profile_following.textContent = profile_following_num;
    profile_followers.textContent = profile_followers_num;
    profile_Post.textContent = profile_post_num;
    Your.textContent = username;
    load_user_information()
        .then(result => {
            var myowenpost = result["posts"];
            if (document.getElementById("profile_main_post_area").hasChildNodes()) {
                document.getElementById("profile_main_post_area").innerHTML = "";
            }
            for (let i = 0; i < myowenpost.length; i++) {
                load_user_own_post(myowenpost[i])
                    .then(result => {
                        // console.log(result);
                        var postBox = document.createElement('div');
                        var authorBox = document.createElement('div');
                        var open_authorBox = document.createElement('button');
                        var imagebox = document.createElement('div');
                        var inserimage = document.createElement('img');
                        var Like_and_comment_box = document.createElement('div');
                        var like_box = document.createElement('button');
                        const comment_box = document.createElement('button');
                        const comment_input = document.createElement('input');
                        const comment_box_area = document.createElement('div');
                        const discription_box = document.createElement('div');
                        const discription_input = document.createElement('input');
                        var imageboxsrc;
                        var count_div_like = document.createElement('p');
                        const count_div_comment = document.createElement('p');
                        var time_box = document.createElement('p');
                        var id_box = document.createElement('p');
                        var small_comment_respectively = document.createElement('div');
                        var my_Edit = document.createElement('button');
                        var my_delete = document.createElement('button');
                        const discription_button = document.createElement('button');

                        postBox.classList.add('small_sub_area_post');
                        authorBox.classList.add("a_author_area");
                        open_authorBox.classList.add("a_author_picture");
                        count_div_like.classList.add("count_div_comment");
                        count_div_comment.classList.add("count_div_comment");
                        id_box.classList.add("count_div_comment");

                        imagebox.classList.add("images_style");
                        discription_box.classList.add("discription_area");
                        like_box.classList.add('login_area_like');
                        comment_box.classList.add("login_area_like");
                        Like_and_comment_box.classList.add("comment_like_style");
                        comment_box_area.classList.add("comment_area");
                        inserimage.classList.add("image_insert");
                        time_box.classList.add("time_div_comment");
                        small_comment_respectively.classList.add("small_comment_respectively");
                        my_Edit.classList.add('login_area_like');
                        my_delete.classList.add('login_area_Delete');
                        discription_input.classList.add('discription_input');
                        discription_button.classList.add('discription_button');

                        like_box.innerText = "Like";
                        comment_box.innerText = "Comment";
                        open_authorBox.innerText = "Open";
                        my_Edit.innerText = "Edit";
                        my_delete.innerText = "Delete";
                        discription_button.innerText = "Submit";

                        var Likes = result["meta"]["likes"].length;
                        var comments = result["comments"].length;
                        var time = result["meta"]["published"];
                        const post_id = result["id"];


                        for (let j = 0; j < result["comments"].length; j++) {
                            var comments_detail_username_box = document.createElement('div');
                            var comments_detail_comment_box = document.createElement('div');
                            var comments_detail_time_box = document.createElement('div');
                            var another_box = document.createElement('div');

                            comments_detail_username_box.classList.add("small_information");
                            comments_detail_comment_box.classList.add("small_information_comment");
                            comments_detail_time_box.classList.add("small_information_time");
                            another_box.classList.add("another_box_style");

                            var comments_detail = result["comments"][j];
                            var comments_detail_username = result["comments"][j]['author'];
                            var comments_detail_comment = result["comments"][j]['comment'];
                            var comments_detail_time = result["comments"][j]['published'];



                            var detail_time = TimeCalcute(comments_detail_time);

                            comments_detail_username_box.innerText = comments_detail_username + ":";
                            comments_detail_comment_box.innerText = comments_detail_comment;
                            comments_detail_time_box.innerText = detail_time;
                            //small_comment_respectively.innerText = comments_detail_username + comments_detail_comment + detail_time;
                            another_box.appendChild(comments_detail_username_box);
                            another_box.appendChild(comments_detail_comment_box);
                            another_box.appendChild(comments_detail_time_box);
                            small_comment_respectively.appendChild(another_box);
                            comment_box_area.appendChild(small_comment_respectively);
                            // console.log(comment_box_area);

                        }

                        var detail_time = TimeCalcute(time);
                        // console.log(Y + M + D + h + m + s);

                        count_div_like.innerText = Likes;
                        count_div_comment.innerText = comments;
                        time_box.innerText = detail_time;
                        id_box.innerText = post_id;
                        // who_like_the_pos_box.innerText = who_like_the_post;

                        authorBox.innerText = result["meta"]["author"];
                        discription_box.innerText = result["meta"]["description_text"];

                        imageboxsrc = result["thumbnail"];
                        inserimage.setAttribute('src', `data:image/jpeg;base64, ${imageboxsrc}`);
                        // console.log("yes!! I'm comment")
                        // console.log(comments);
                        // comment_box_area.innerText = comments;

                        Like_and_comment_box.appendChild(like_box);
                        Like_and_comment_box.appendChild(count_div_like);
                        Like_and_comment_box.appendChild(comment_input);
                        //comment////
                        comment_box.addEventListener('click', event => submit_comment_myself(comment_input.value, post_id));
                        Like_and_comment_box.appendChild(comment_box);
                        Like_and_comment_box.appendChild(count_div_comment);

                        Like_and_comment_box.appendChild(time_box);
                        discription_input.style.display = "none";
                        discription_button.style.display = "none";
                        comment_box_area.style.overflowX = "scroll";
                        discription_box.style.overflowX = "scroll";




                        ///comment////
                        my_Edit.addEventListener('click', () => {
                            discription_box.style.display = "none";
                            discription_input.style.display = "flex";
                            discription_button.style.display = 'block';
                        })


                        discription_input.style.display = "none";
                        discription_button.style.display = "none";

                        Like_and_comment_box.appendChild(my_Edit);
                        id_box.style.display = "none";
                        imagebox.appendChild(inserimage);
                        imagebox.appendChild(id_box);
                        postBox.appendChild(authorBox);
                        postBox.appendChild(open_authorBox);
                        postBox.appendChild(imagebox);
                        postBox.appendChild(discription_input);
                        postBox.appendChild(discription_box);


                        discription_button.addEventListener('click', () => {
                            const content = {
                                "description_text": discription_input.value,
                                "src": imageboxsrc
                            }
                            const result = fetch("http://localhost:5000/post?id=" + post_id, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Token ' + Login_token
                                },
                                body: JSON.stringify(content)
                            }).then(data => {
                                    if (data.status != 200) {
                                        return data.json()
                                            .then(result => {
                                                // console.log(result);
                                                alert(result["message"]);
                                            })
                                    } else if (data.status == 200) {
                                        alert("SUCCESS");
                                        return data.json()
                                            .then(() => {
                                                discription_box.style.display = "flex";
                                                discription_input.style.display = "none";
                                                discription_button.style.display = 'none';
                                                profile_my_self();
                                            });

                                    }


                                }

                            )

                        })
                        postBox.appendChild(discription_button);
                        postBox.appendChild(Like_and_comment_box);
                        postBox.appendChild(comment_box_area);
                        my_delete.addEventListener('click', () => {
                            // alert("SUCCESS");
                            const result = fetch("http://localhost:5000/post?id=" + post_id, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Token ' + Login_token
                                },
                            }).then(data => {
                                if (data.status != 200) {
                                    return data.json()
                                        .then(result => {
                                            // console.log(result);
                                            // alert(result["message"]);
                                        })
                                } else if (data.status == 200) {
                                    alert("SUCCESS");
                                    return data.json()
                                        .then(() => {
                                            profile_my_self();
                                        });
                                }
                            })
                        })
                        postBox.appendChild(my_delete);
                        document.getElementById("profile_main_post_area").appendChild(postBox)
                    })
            }
        })

}




/************  SHOW Other'sProfile FEED ***************/
const search_functin_detial = (username_type, the_real_name) => {
    const result = fetch("http://localhost:5000/user?" + username_type + "=" + the_real_name, {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + Login_token,
            'Accept': 'application/json',
        },
    }).then(data => {
        if (data.status != 200) {
            data.json().then(result => {

                alert(result["message"]);
            })
        } else if (data.status == 200) {
            follow_other.textContent = "follow";
            data.json().then(result => {
                word_text.style.display = "none";
                profile_information.style.display = "flex";
                modal.style.display = "none";
                edit_part.style.display = "none";
                search_part.style.display = "none";

                id = result["id"];
                //Judge 这个人是否follow了。
                // console.log(result["id"]);
                // console.log("i'm here");
                // console.log(self_token_following);
                for (var i = 0; i < self_token_following.length; i++) {
                    // console.log(self_token_following[i]);
                    if (self_token_following[i] == result["id"]) {
                        follow_other.textContent = "Unfollow";
                    }
                }
                name = result["name"];
                username = result["username"];

                search_first_people_username = result["username"]

                followed_num = result["followed_num"];

                post = result["posts"];

                following_num = result["following"];
                email = result["email"];

                Profile_username_email = email;
                profile_following_num = following_num.length;
                profile_followers_num = followed_num
                profile_post_num = post.length

                Your.textContent = username;
                profile_username.textContent = username;
                profile_Email.textContent = Profile_username_email;
                profile_following.textContent = profile_following_num;
                profile_followers.textContent = profile_followers_num;
                profile_Post.textContent = profile_post_num;
                load_user_information();
                edit_yourself.style.display = "none";
                profile_main_post_area.style.display = "none";
                main_post_area.style.display = "none";
                others_profile_main_post_area.style.display = "block";
                if (document.getElementById("others_profile_main_post_area").hasChildNodes()) {
                    document.getElementById("others_profile_main_post_area").innerHTML = "";
                }

                for (let i = 0; i < result["posts"].length; i++) {
                    load_user_own_post(result["posts"][i])
                        .then(result => {
                            // console.log(result);
                            // alert("result");
                            var postBox = document.createElement('div');
                            var authorBox = document.createElement('div');
                            var open_authorBox = document.createElement('button');
                            var imagebox = document.createElement('div');
                            var inserimage = document.createElement('img');
                            var Like_and_comment_box = document.createElement('div');
                            var like_box = document.createElement('button');
                            const comment_box = document.createElement('button');
                            const comment_input = document.createElement('input');
                            const comment_box_area = document.createElement('div');
                            var discription_box = document.createElement('div');
                            var imageboxsrc;
                            var count_div_like = document.createElement('p');
                            const count_div_comment = document.createElement('p');
                            var time_box = document.createElement('div');
                            var id_box = document.createElement('p');
                            var small_comment_respectively = document.createElement('div');
                            var who_like_the_pos_box = document.createElement('p');
                            var red_heart = document.createElement('div');


                            postBox.classList.add('small_sub_area_post');
                            authorBox.classList.add("a_author_area");
                            open_authorBox.classList.add("a_author_picture");
                            count_div_like.classList.add("count_div_comment");
                            count_div_comment.classList.add("count_div_comment");
                            id_box.classList.add("count_div_comment");
                            who_like_the_pos_box.classList.add("count_div_comment");

                            imagebox.classList.add("images_style");
                            discription_box.classList.add("discription_area");
                            like_box.classList.add('login_area_like');
                            comment_box.classList.add("login_area_like");
                            Like_and_comment_box.classList.add("comment_like_style");
                            comment_box_area.classList.add("comment_area");
                            inserimage.classList.add("image_insert");
                            time_box.classList.add("time_div_comment");
                            small_comment_respectively.classList.add("small_comment_respectively");
                            red_heart.classList.add("the_number_of_people_like");
                            like_box.innerText = "Like";

                            comment_box.innerText = "Comment";
                            open_authorBox.innerText = "Open";

                            var Likes = result["meta"]["likes"].length;
                            var comments = result["comments"].length;
                            var time = result["meta"]["published"];
                            var post_id = result["id"];
                            const who_like_the_post = result["meta"]["likes"];


                            for (let j = 0; j < result["comments"].length; j++) {
                                var comments_detail_username_box = document.createElement('div');
                                var comments_detail_comment_box = document.createElement('div');
                                var comments_detail_time_box = document.createElement('div');
                                var another_box = document.createElement('div');

                                comments_detail_username_box.classList.add("small_information");
                                comments_detail_comment_box.classList.add("small_information_comment");
                                comments_detail_time_box.classList.add("small_information_time");
                                another_box.classList.add("another_box_style");

                                var comments_detail = result["comments"][j];
                                var comments_detail_username = result["comments"][j]['author'];
                                var comments_detail_comment = result["comments"][j]['comment'];
                                var comments_detail_time = result["comments"][j]['published'];

                                //alert(comments_detail);
                                // console.log(comments_detail);

                                var detail_time = TimeCalcute(comments_detail_time);

                                comments_detail_username_box.innerText = comments_detail_username + ":";
                                comments_detail_comment_box.innerText = comments_detail_comment;
                                comments_detail_time_box.innerText = detail_time;
                                another_box.appendChild(comments_detail_username_box);
                                another_box.appendChild(comments_detail_comment_box);
                                another_box.appendChild(comments_detail_time_box);
                                small_comment_respectively.appendChild(another_box);
                                comment_box_area.appendChild(small_comment_respectively);
                                // console.log(comment_box_area);

                            }
                            var detail_time = TimeCalcute(time);

                            count_div_like.innerText = Likes;
                            count_div_comment.innerText = comments;
                            time_box.innerText = detail_time;
                            id_box.innerText = post_id;
                            who_like_the_pos_box.innerText = who_like_the_post;

                            authorBox.innerText = result["meta"]["author"];
                            discription_box.innerText = result["meta"]["description_text"];

                            imageboxsrc = result["thumbnail"];
                            inserimage.setAttribute('src', `data:image/jpeg;base64, ${imageboxsrc}`);
                            // console.log("yes!! I'm comment")
                            // console.log(comments);


                            Like_and_comment_box.appendChild(like_box);
                            Like_and_comment_box.appendChild(count_div_like);
                            Like_and_comment_box.appendChild(comment_input);

                            comment_box.addEventListener('click', event => {
                                // console.log(post_id);
                                const comment_send = {
                                    "comment": comment_input.value
                                }
                                return fetch("http://localhost:5000/post/comment?id=" + post_id, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Token ' + Login_token
                                        },
                                        body: JSON.stringify(comment_send)
                                    })
                                    .then(data => {
                                        if (data.status != 200) {
                                            data.json()
                                                .then(result => {
                                                    // console.log(result);
                                                    alert(result["msg"]);
                                                })
                                        } else if (data.status == 200) {
                                            data.json()
                                                .then(result => {
                                                    alert("SUCCESS")
                                                    modal.style.display = "none";
                                                    search_functin_detial(username_type, the_real_name);

                                                })
                                        }
                                    })

                            })

                            Like_and_comment_box.appendChild(comment_box);
                            Like_and_comment_box.appendChild(count_div_comment);
                            Like_and_comment_box.appendChild(time_box);
                            id_box.style.display = "none";
                            who_like_the_pos_box.style.display = "none";
                            comment_box_area.style.overflowX = "scroll";
                            discription_box.style.overflowX = "scroll";

                            imagebox.appendChild(inserimage);
                            imagebox.appendChild(id_box);
                            postBox.appendChild(authorBox);
                            postBox.appendChild(open_authorBox);
                            postBox.appendChild(imagebox);
                            postBox.appendChild(discription_box);
                            postBox.appendChild(Like_and_comment_box);
                            postBox.appendChild(red_heart);
                            postBox.appendChild(comment_box_area);
                            document.getElementById("others_profile_main_post_area").appendChild(postBox);

                        })
                }
            })
        }
    })
}

const search_other_funtion = () => {
    // console.log("search_other_funtion");
    return fetch("http://localhost:5000/user?username=" + profile_username.textContent, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token
            },
        }).then(data => {
            if (data.status != 200) {
                return data.json()
                    .then(result => {
                        // console.log(result);
                        alert(result["message"]);
                    })
            } else if (data.status == 200) {
                return data.json();
            }
        })
        .then(result => {
            return result;
        })
}



const search_other_funtion_second = (name) => {
    // console.log("search_other_funtion");
    return fetch("http://localhost:5000/user?username=" + name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token
            },
        }).then(data => {
            if (data.status != 200) {
                return data.json()
                    .then(result => {
                        console.log(result);
                        alert(result["message"]);
                    })
            } else if (data.status == 200) {
                return data.json();
            }
        })
        .then(result => {
            return result;
        })
}




const search_other_funtion_id = (id) => {
    // console.log("search_other_funtion_id");
    return fetch("http://localhost:5000/user?id=" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token
            },
        }).then(data => {
            if (data.status != 200) {
                return data.json()
                    .then(result => {
                        console.log(result);
                        alert(result["message"]);
                    })
            } else if (data.status == 200) {
                return data.json();
            }
        })
        .then(result => {
            return result;
        })
}


function readFiles(file) {
    if (!file) {
        return
    }
    let fileRead = new FileReader();
    return new Promise((resolve) => {
        fileRead.addEventListener('load', res => {
            let result = res.target.result;
            result = result.replace(/^data.*,/, "");
            resolve(result);
        });
        fileRead.readAsDataURL(file);
    })
}




/************  function inplement area ***************/
/************  Login area ***************/
/************  Login area ***************/
log_in.addEventListener('click', event => {
    var password_pass = 1;
    if (login_confirm_Passward.value.length != login_Passward.value.length) {
        password_pass = 0;
        alert("The Passwords are not same");
    } else if (login_confirm_Passward.value.length == 0 || login_Passward.value.length == 0) {
        password_pass = 0;
        alert("The Passwords can't be zero");
    } else if (login_confirm_Passward.value.length == login_Passward.value.length) {
        for (var i = 0; i < login_confirm_Passward.value.length; i++) {
            if (login_confirm_Passward.value[i] != login_Passward.value[i]) {
                password_pass = 0;
                alert("The Passwords are not same");
            }
        }
    }
    if (password_pass == 1) {
        const Loginbody = {
                "username": login_Username.value,
                "password": login_Passward.value
            }
            // console.log(login_Username.value);
            // console.log(login_Passward.value);

        const result = fetch("http://localhost:5000/auth/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Loginbody)
            }).then(data => {
                if (data.status == 403) {
                    alert("Error: 403! Incorrect Login Detial ");
                }
                /*********  SHOW FEED **********/
                else if (data.status == 200) {
                    // console.log("yes");
                    data.json().then(result => {
                        // console.log(result.token);
                        Login_token = result.token;
                        show_left_login.style.display = "none";
                        show_right_login.style.display = "none";
                        show_right_already_login.style.display = "flex";
                        show_left_already_login.style.display = "flex";
                        main_post_area.style.display = 'flex';
                        loadfeed_two();
                        loadfeed();
                        load_user_information();

                    })
                }
            }).catch((error) => {})
            // console.log(result);
    }
})

/************  Signup area ***************/
submit_buttom.addEventListener('click', event => {
    var password_pass = 1;
    if (sign_in_confirmed_password.value.length != sign_in_password.value.length) {
        password_pass = 0;
        alert("The Passwords are not same");
    } else if (sign_in_confirmed_password.value.length == 0 || sign_in_password.value.length == 0) {
        password_pass = 0;
        alert("The Passwords can't be zero");
    } else if (sign_in_confirmed_password.value.length == sign_in_password.value.length) {
        password_pass = 0;
        for (var i = 0; i < sign_in_confirmed_password.value.length; i++) {
            // console.log(sign_in_confirmed_password.value);
            if (sign_in_confirmed_password.value[i] != sign_in_password.value[i]) {
                alert("The Passwords are not same");
            }
        }
    }
    if (password_pass = 1) {
        const user = {
            "username": sign_in_Username.value,
            "password": sign_in_password.value,
            "email": sign_in_Email.value,
            "name": sign_in_Name.value
        }
        const result = fetch("http://localhost:5000/auth/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(data => {
            if (data.status != 200) {
                data.json().then(result => {
                    // console.log(result);
                    alert(result["message"]);
                })
            } else if (data.status == 200) {
                data.json().then(result => {
                    console.log(result);
                    Login_token = result.token;
                    // console.log(Login_token);
                    Show_Success.style.display = "block";
                });
            }
        })

    }
})



/*********  profile show self-information  **********/
Profile.addEventListener('click', event => {
    load_user_information()
        .then(result => {
            profile_Post.textContent = result["posts"].length;
        });

    word_text.style.display = "none";
    profile_information.style.display = "flex";
    edit_yourself.style.display = "flex";
    follow_other.textContent = "follow";
    profile_main_post_area.style.display = "block"
    main_post_area.style.display = "none";
    others_profile_main_post_area.style.display = "none";
    post_picture.style.display = "none";

    username = login_Username.value;
    Profile_username_email = email;
    profile_following_num = following_num.length;
    profile_followers_num = followed_num;
    profile_post_num = post.length;
    // console.log("profile_post_num" + profile_post_num);

    profile_username.textContent = username;
    profile_Email.textContent = Profile_username_email;
    profile_following.textContent = profile_following_num;
    profile_followers.textContent = profile_followers_num;
    profile_Post.textContent = profile_post_num;
    Your.textContent = username;

    profile_my_self();

})


/*********  Edit your infromation  **********/
edit_yourself.addEventListener('click', event => {
    modal.style.display = "block";
    edit_part.style.display = "block"
    show_follow_people_name.style.display = "none";
    the_comment_yousent.style.display = 'none';


})

confirm_for_small_box.addEventListener('click', event => {
    // console.log("I'm doing put");
    const user = {
        "email": login_new_Email.value,
        "name": login_new_Usersname.value,
        "password": login_new_PassWord.value
    }
    const result = fetch("http://localhost:5000/user", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + Login_token
        },
        body: JSON.stringify(user)
    }).then(data => {
        if (data.status == 200) {
            data.json().then(result => {
                alert(result["msg"])
                modal.style.display = "none";
                edit_part.style.display = "none";
                search_part.style.display = "none";
                login_new_Usersname.value = " ";
                login_new_Email.value = " ";
                login_new_PassWord.value = " ";
                load_user_information().then(json => {

                    profile_Email.textContent = json["email"];
                });
            })
        } else if (data.status != 200) {
            data.json().then(result => {

                alert(result["msg"]);
            })
        }
    })
})


/*********  profile pop_up area **********/
closebutton.onclick = function() {
    modal.style.display = "none";
    edit_part.style.display = "none"
    search_part.style.display = "none";
    show_follow_people_name.style.display = "none";
    the_comment_yousent.style.display = "none";
    login_new_Usersname.value = " ";
    login_new_Email.value = " ";
    login_new_PassWord.value = " ";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        edit_part.style.display = "none"
        search_part.style.display = "none";
        show_follow_people_name.style.display = "none";
        the_comment_yousent.style.display = "none";

    }
}

area_search_button.addEventListener('click', event => {
    modal.style.display = "block";
    search_part.style.display = "block";
    the_comment_yousent.style.display = "none";

})

search_for_small_box.addEventListener("click", event => {
    the_comment_yousent.style.display = 'none';
    post_picture.style.display = "none";
    var the_real_name = what_the_Usersname.value;
    search_functin_detial("username", the_real_name);
})



/*********  folloe people and unfollow people**********/
follow_other.addEventListener("click", event => {
    // console.log(follow_other.textContent);
    if (follow_other.textContent == "follow") {
        // console.log("following user information");
        // console.log(profile_username.textContent);
        if (profile_username.textContent == login_Username.value) {
            alert("You can't follow yourself");
        } else {
            const result = fetch("http://localhost:5000/user/follow?username=" + profile_username.textContent, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + Login_token
                },
            }).then(data => {
                if (data.status != 200) {
                    data.json()
                        .then(result => {
                            // console.log(result);
                            alert(result["message"]);
                        })
                } else if (data.status == 200) {
                    data.json()
                        .then(result => {
                            // console.log(result);
                            alert(result["message"])
                            follow_other.textContent = "Unfollow";
                            load_user_information();
                            search_other_funtion()
                                .then(result => {
                                    // console.log(result);
                                    profile_followers.textContent = result["followed_num"];
                                    profile_following.textContent = result["following"].length;
                                });
                        })

                }
            })
        }
    } else if (follow_other.textContent == "Unfollow") {
        if (profile_username.textContent == login_Username.value) {
            alert("You can't Unfollow yourself");
        } else {
            const result = fetch("http://localhost:5000/user/unfollow?username=" + profile_username.textContent, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + Login_token
                },
            }).then(data => {
                if (data.status != 200) {
                    data.json()
                        .then(result => {
                            // console.log(result);
                            alert(result["message"]);
                        })
                } else if (data.status == 200) {
                    data.json()
                        .then(result => {
                            // console.log(result);
                            alert(result["message"])
                            follow_other.textContent = "follow";
                            load_user_information();
                            search_other_funtion()
                                .then(result => {
                                    // console.log(result);
                                    profile_followers.textContent = result["followed_num"];
                                    profile_following.textContent = result["following"].length;
                                });
                        })
                }
            })
        }
    }
})




/*********  show the people you follow**********/
following_button.addEventListener("click", event => {
    modal.style.display = "block";
    show_follow_people_name.style.display = "block";
    the_comment_yousent.style.display = "none";
    // console.log(login_Username.value);
    // console.log(profile_username.textContent);
    if (login_Username.value == profile_username.textContent) {
        following_s_people_name.textContent = '';
        following_name_list = '';
        load_user_information()
            .then(result => {
                // console.log("I'm in following button");
                // console.log(result);
                following_name_list = '|';
                for (let i = 0; i < result['following'].length; i++) {
                    following_id = result['following'][i];
                    search_other_funtion_id(following_id)
                        .then(result => {
                            // console.log(result);
                            result[username]
                            following_name_list += result["username"] + '|';
                            return following_name_list;
                        }).then((result) => {
                            following_s_people_name.textContent = result;
                        })
                }
            })
    } else {
        following_s_people_name.textContent = '';
        following_name_list = '';
        search_other_funtion_second(profile_username.textContent)
            .then(result => {
                following_name_list = '|';
                for (let i = 0; i < result['following'].length; i++) {
                    following_id = result['following'][i];
                    search_other_funtion_id(following_id)
                        .then(result => {
                            // console.log(result);
                            // result[username]
                            following_name_list += result["username"] + '|';
                            return following_name_list;
                        }).then((result) => {
                            following_s_people_name.textContent = result;
                        })
                }
            })

    }
})




/*********  home page area **********/
home_page.addEventListener('click', event => {
    // alert("I'm home_button")
    word_text.style.display = "block";
    profile_information.style.display = "none";
    main_post_area.style.display = "block";
    // alert("main_post_area.style.display");
    post_picture.style.display = "none";
    profile_main_post_area.style.display = "none";
    others_profile_main_post_area.style.display = "none";


    load_user_information().
    then(result => {
        // console.log(result);
        loadfeed();
        const reslt = fetch("http://localhost:5000/user/feed?p=0&n=10", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token,
            },
        }).then(data => {
            if (data.status != 200) {
                data.json().then(result => {
                    // console.log(result);
                    alert(result["message"]);
                })
            } else if (data.status == 200) {
                data.json().then(result => {
                    // console.log(result);
                    var length = result["posts"].length;
                    if (length != dict_length) {
                        // console.log("not eqaual");
                        // console.log("Second_dict" + dict);
                        dict = new Array();
                        for (let i = 0; i < length; i++) {
                            dict[i] = "Like";
                        }
                        // console.log("Second_dict" + dict);
                    }
                })
            }
        })

    })



})

/*********  log out  area **********/
Log_out_buttom.addEventListener('click', event => {
    show_left_login.style.display = "flex";
    show_right_login.style.display = "flex";
    show_right_already_login.style.display = "none";
    show_left_already_login.style.display = "none";
    main_post_area.style.display = "none";
    login_Username.value = '';
    login_Passward.value = '';
    login_confirm_Passward.value = '';
    others_profile_main_post_area.style.display = 'none';

})



/*********  new post  area **********/
send_post.addEventListener("click", event => {
    // document.getElementById("loginJs").src = "src/login.js";
    let file = document.getElementById("filePost").files[0];
    let commentUpLoad = document.getElementById("new-post-text").value;
    if (commentUpLoad === '') {
        alert("Write something!");
        return;
    }
    readFiles(file).then(res => {
        commentUpLoad = document.getElementById("new-post-text").value;
        // console.log(res);
        var data = {
            "description_text": commentUpLoad,
            "src": res
        };
        let para = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Login_token,
            },
        }
        fetch('http://localhost:5000/post/', para).then(res => {
            // console.log(res);
            if (res.status === 200) {
                res.json().then(res => {
                    alert("SUCCESS");
                    load_user_information().then(result => {
                        // console.log(result);
                        profile_Post.textContent = result["posts"].length;
                        profile_main_post_area.style.display = "block";
                        post_picture.style.display = "none";
                        profile_my_self();
                    })
                })
            } else {
                res.json().then(res => {
                    // console.log(res["message"]);
                    alert(res["message"]);
                })
            }
        });
    });
})


New_Post.addEventListener("click", event => {
    word_text.style.display = "none";
    profile_information.style.display = "flex";
    edit_yourself.style.display = "flex";
    follow_other.textContent = "follow";
    profile_main_post_area.style.display = "none"
    main_post_area.style.display = "none";
    others_profile_main_post_area.style.display = "none";
    post_picture.style.display = "flex";

    load_user_information()
        .then(result => {
            profile_Post.textContent = result["posts"].length;
        });

    username = login_Username.value;
    Profile_username_email = email;
    profile_following_num = following_num.length;
    profile_followers_num = followed_num;
    profile_post_num = post.length;
    // console.log("profile_post_num" + profile_post_num);

    profile_username.textContent = username;
    profile_Email.textContent = Profile_username_email;
    profile_following.textContent = profile_following_num;
    profile_followers.textContent = profile_followers_num;
    profile_Post.textContent = profile_post_num;
    Your.textContent = username;

})
cancel_post.addEventListener("click", event => {
    new_post_text.value = '';

})