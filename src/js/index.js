import { elements } from "./views/base";
$(document).ready(function() {
  console.log("ready!");

  const state = {
    page: -1
  };

  //declaring start and end for the page load

  // page:0
  // start: page x 29 = 0
  // end: (page + 1) x 29 =29

  // page:1
  // start: page x 29 = 29
  // end: (page + 1) x 29 =58
  /* let start = state.page * 30;
  let end = (state.page + 1) * 30; */

  //get the id of all top stories
  async function getIdOfTopStories() {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );

    const data = await response.json();
    return data;
  }

  //load all the ids by calling the API
  state.idOfTopStories = getIdOfTopStories();

  async function loadArticles(start, end) {
    if (start !== 0 && end !== 30) {
      start = state.page * 30;
      end = (state.page + 1) * 30;
    }

    let articleIds = await state.idOfTopStories;
    let currentArticleIds = await articleIds.slice(start, end);
    console.log(articleIds);
    console.log(currentArticleIds);

    return await Promise.all(
      currentArticleIds.map(async function(articleId) {
        let response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`
        );
        let articleData = response.json();
        return articleData;
      })
    );
  }

  //function: construct article objects
  async function renderArticles(start, end) {
    state.page = state.page + 1;
    console.log("state.page is,", state.page);
    let articlesLoaded = await loadArticles(start, end);
    console.log(articlesLoaded);
    //articlesLoaded.map(cur => console.log(cur.url));

    return await Promise.all(
      articlesLoaded.map(function(article, index) {
        createViewForItem(article.url, index);
      })
    );
  }

  //construct article objects for rendering
  renderArticles(0, 30);

  async function createViewForItem(url, counter) {
    /* fetch("http://localhost:8080/getImageUrl", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "post",
      mode: "cors",
      body: JSON.stringify({ itemUrl: url })
    })
      .then(response => console.log("response is,", response.json()))
      .then(result => console.log("result is", result)); */

    $.ajax({
      type: "POST",
      url: "https://powerful-cliffs-35605.herokuapp.com/getImageUrl",
      data: {
        url
      }
    }).then(data => {
      //let imageUrl = data.image;
      console.log("counter is", counter);
      console.log("data is ", data);
      console.log("data.length is,", data.length);

      if (counter % 2 === 0) {
        if (data.image) {
          let markup = ` <li class="recent-posts__item">
          <figure class="recent-posts__item--image-container">
              <img src="${data.image}"
                  alt="
              recent-posts-image" class="recent-posts__item--image">
          </figure>
          <div class="recent-posts__item--content">
              <div class="posts__header">
                  Money Diaries
              </div>
              <div class="posts__title">
                  ${data.title}
              </div>
              <div class="posts__content">
                  ${data.description}
              </div>
          </div>
      </li>`;
          elements.recentPostListRight.insertAdjacentHTML("beforeend", markup);
        } else {
          let markup = ` <li class="recent-posts__item">
          <figure class="recent-posts__item--image-container">
              <img src="https://wealthsimple-grow.ghost.io/content/images/2018/10/NatashaRothwell_final.jpg"
                  alt="
              recent-posts-image" class="recent-posts__item--image">
          </figure>
          <div class="recent-posts__item--content">
              <div class="posts__header">
                  Money Diaries
              </div>
              <div class="posts__title">
                  Natasha Rothwell Plays an Accountant on 'Insecure.' Her Real Life Wasn't So
                  Excel-Ready.
              </div>
              <div class="posts__content">
                  A Money Diary about subsidized housing, writing for 'Saturday Night Live,' and
                  getting
                  into
                  credit card debt from the actress ('Love, Simon') and writer.
              </div>
          </div>
      </li>`;
          elements.recentPostListRight.insertAdjacentHTML("beforeend", markup);
        }
      } else {
        if (data.image) {
          let markup = ` <li class="recent-posts__item">
          <figure class="recent-posts__item--image-container">
              <img src="${data.image}"
                  alt="
              recent-posts-image" class="recent-posts__item--image">
          </figure>
          <div class="recent-posts__item--content">
              <div class="posts__header">
                  Money Diaries
              </div>
              <div class="posts__title">
                  ${data.title}
              </div>
              <div class="posts__content">
                  ${data.description}
              </div>
          </div>
      </li>`;
          elements.recentPostListLeft.insertAdjacentHTML("beforeend", markup);
        } else {
          let markup = ` <li class="recent-posts__item">
          <figure class="recent-posts__item--image-container">
              <img src="https://wealthsimple-grow.ghost.io/content/images/2018/10/NatashaRothwell_final.jpg"
                  alt="
              recent-posts-image" class="recent-posts__item--image">
          </figure>
          <div class="recent-posts__item--content">
              <div class="posts__header">
                  Money Diaries
              </div>
              <div class="posts__title">
                  Natasha Rothwell Plays an Accountant on 'Insecure.' Her Real Life Wasn't So
                  Excel-Ready.
              </div>
              <div class="posts__content">
                  A Money Diary about subsidized housing, writing for 'Saturday Night Live,' and
                  getting
                  into
                  credit card debt from the actress ('Love, Simon') and writer.
              </div>
          </div>
      </li>`;
          elements.recentPostListLeft.insertAdjacentHTML("beforeend", markup);
        }
      }
      // console.log("imageUrl is ", imageUrl);

      /*  if (imageUrl) {
        $('.articles').append(`<div><h3>${element.title}</h3>
                           <img src=${imageUrl} /></div>
                            `);
    } else {
        $('.articles').append(`<h3>${element.title}</h3>
                              `);
    }  */
      return data;
    });

    /* result.done(function(html) {
      console.log("html is", html);
    }); */
  }
  var doit;
  $(window).scroll(function() {
    var hT = $(".load-more-posts").offset().top,
      hH = $(".load-more-posts").outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    //console.log(hT - wH, wS);
    if (wS > hT + hH - wH) {
      //alert("you have scrolled to the h1!");
      //renderArticles();
      clearTimeout(doit);
      doit = setTimeout(renderArticles, 2000);
    }
  });
});
