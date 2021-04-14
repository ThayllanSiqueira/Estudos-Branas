const axios = require('axios');
const postsService = require('../service/postsService');
const crypto = require('crypto');

const generate = function() {
    return crypto.randomBytes(20).toString('hex');
}

const request = function (url, method, data){
    return axios({url, method, data, validateStatus: false});
}

test('Should get posts', async function () {
    const post1 = await postsService.savePost({ title: generate(), content: generate() })
    const post2 = await postsService.savePost({ title: generate(), content: generate() })
    const post3 = await postsService.savePost({ title: generate(), content: generate() })

    const res = await request('http://localhost:3000/posts', 'get');
    expect(res.status).toBe(200);
    const posts = res.data;
    expect(posts).toHaveLength(3);
    await postsService.deletePost(post1.id);
    await postsService.deletePost(post2.id);
    await postsService.deletePost(post3.id);
    
});

test('Should get a post', async function () {
    const post = await postsService.savePost({ title: generate(), content: generate() })
    const res = await request(`http://localhost:3000/posts/${post.id}`, 'get');
    expect(res.status).toBe(200);
    const returnedPost = res.data;
    expect(post.title).toBe(returnedPost.title);
    expect(post.content).toBe(returnedPost.content);

    await postsService.deletePost(returnedPost.id);
});

test('Should save a post', async function () {
    const data = { title: generate(), content: generate() }
    const res = await request('http://localhost:3000/posts', 'post', data);
    expect(res.status).toBe(201);
    const post = res.data;
    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);
    await postsService.deletePost(post.id);
    
});

test('Should not save a post', async function () {
    const data = { title: generate(), content: generate() }
    const res1 = await request('http://localhost:3000/posts', 'post', data);
    const res2 = await request('http://localhost:3000/posts', 'post', data);
    expect(res2.status).toBe(409);
    const post = res1.data;
    await postsService.deletePost(post.id);
});

test('Should update a post', async function () {
    const post = await postsService.savePost({ title: generate(), content: generate() });
    post.title = generate();
    post.content = generate();

    const res = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
    expect(res.status).toBe(204);
    const updatePost = await postsService.getPost(post.id);
    expect(updatePost.title).toBe(post.title);
    expect(updatePost.content).toBe(post.content);

    await postsService.deletePost(post.id);
    
});

test('Should not update a post', async function () {
    const post = {
        id: 1
    }

    const res = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
    expect(res.status).toBe(404);
   
});

test('Should delete a post', async function () {
    const post = await postsService.savePost({ title: generate(), content: generate() });

    await request(`http://localhost:3000/posts/${post.id}`, 'delete');
    const posts = await postsService.getPosts();
    expect(posts).toHaveLength(0);
    
});
