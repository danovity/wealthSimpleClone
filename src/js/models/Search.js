/* import axios from "axios";

export default class Search {
  constructor() {}

  async getIdOfTopStories() {
    try {
      await axios(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
      ).then(res => {
        this.topStories = res.data;
        console.log(this.topStories);
        return res.data;
      });
    } catch (error) {
      alert(error);
    }
  }

  async getArticleTitles() {
    try {
      let getEachArticleContent = new Promise((resolve, reject) => {
        this.topStories.forEach((id, index) => {
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          );
        });
      });

      Promise.all([getEachArticleContent]).then(articleContent => {
        this.articleContent[index].title = articleContent.data.title;
        console.log(articleContent.data.title);
        return result;
      });
    } catch (error) {
      alert(error);
    }
  }
} */

import axios from "axios";

export default class Search {
  constructor() {
    this.article = [];
    this.articleResults = [];
  }

  async getIdOfTopStories() {
    let promises = [];

    try {
      const res = await axios(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
      )
        .then(res => {
          this.topStories = res.data;
          console.log(this.topStories);
          console.log(Array.isArray(this.topStories));
          return res.data;
        })
        .then(articleList => {
          articleList.forEach((id, index) => {
            let myUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
            promises.push(axios.get(myUrl));
          });

          axios.all(promises).then(results => {
            console.log(results);
            this.articleResults = results;
            console.log(this.articleResults);
            results.slice(0, 30).forEach((articleContent, index) => {
              $.ajax({
                type: "POST",
                url: "http://localhost:8080/getImageUrl",
                crossDomain: true,
                dataType: "json",
                data: {
                  itemUrl: articleContent.data.url
                }
              }).then(data => {
                return data;
              });
            });
          });
        })
        .catch(error => console.error("error is,", error));

      this.articleContents = res;
    } catch (error) {
      alert(error);
    }
  }
}

/* $("button").click(function() {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/" + $("input").val()
  }).then(function(data) {
    var html = $(data);

    $("#kw").html(getMetaContent(html, "description") || "no keywords found");
    $("#des").html(getMetaContent(html, "keywords") || "no description found");
    $("#img").html(html.find("img").attr("src") || "no image found");
  });
}); */
/* 
results.forEach((articleContent, index) => {
  //mainObject[response.identifier] = response.value;
  if (
    articleContent.data.title !== undefined &&
    articleContent.data.url !== undefined
  ) {
    let title = articleContent.data.title;
    //console.log(articleContent.data.url);
    let myUrl = articleContent.data.url;

    console.log(myUrl);
    /* promisesB.push(axios.get(`${proxy}${myUrl}`));
    console.log("promisesB is,", promisesB); */

/* axios.all(promisesB).then(result => {
      console.log("result is,", result);
    }); */
/* axios.get(articleContent.data.url).then(result => {
      console.log("result is,", result);
    }); 
    this.article.push({ title });
    console.log(this.article);
  }
});  */
