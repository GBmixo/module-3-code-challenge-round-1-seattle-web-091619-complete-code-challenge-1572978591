document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3852 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/3852`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL);

})

function fetchImage(url)
{
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(json => {
        displayImage(json, url);
        console.log('image fetched');
    })
}

function fetchLikes(url)
{
    console.log('fetching likes');
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(json => {
        updateLikes(json);
        console.log('likes fetched');
    })
}

function displayImage(img, url)
{
    console.log(img.like_count);
    imageContainer = document.getElementById('image');
    titleContainer = document.getElementById('name');
    likesContainer = document.getElementById('likes');
    likeButton = document.getElementById('like_button');
    commentsContainer = document.getElementById('comments');

    imageContainer.src = img.url;
    titleContainer.textContent = img.name;
    likesContainer.textContent = img.like_count;
    likeButton.addEventListener('click', () => {
        likeImage(img);
    })

    let i = 0;
    while (i < img.comments.length)
    {
        newComment = document.createElement('li');
        newComment.textContent = img.comments[i].content;
        commentsContainer.appendChild(newComment);
        i++;
    }
}

function likeImage(img)
{
    console.log('clicked');
    likeCounter = document.getElementById('likes');
    likeNum = parseInt(likeCounter.textContent);
    likeNum = likeNum + 1;
    likeCounter.textContent = likeNum


    fetchLikes('https://randopic.herokuapp.com/likes/');
}

function updateLikes(likes)
{
    fetch('https://randopic.herokuapp.com/likes/', {
        method: 'POST',
        headers: 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            
        })
    })
}
