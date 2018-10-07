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
  }

  async getIdOfTopStories() {
    let promises = [];

    try {
      await axios(
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
            results.forEach((articleContent, index) => {
              //mainObject[response.identifier] = response.value;
              if (articleContent.data.title !== undefined) {
                this.article.push({ title: articleContent.data.title });
                console.log(this.article);
              }
            });
          });
        })
        .catch(error => console.error("error is,", error));
    } catch (error) {
      alert(error);
    }

    /* this.topStories.forEach((id, index) => {
      myUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      promises.push(axios.get(myUrl));
    });

    axios.all(promises).then(results => {
      results.forEach((articleContent, index) => {
        //mainObject[response.identifier] = response.value;
        this.articleContent[index].title = articleContent.data.title;
      });
    }); */
  }
}
