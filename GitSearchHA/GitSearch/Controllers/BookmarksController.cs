using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using GitSearch.Models;

namespace GitSearch.Controllers
{
    public class BookmarksController : ApiController
    {
        readonly string _sessinKey = "bookmarks";

        [HttpPost]
        //Insert git repository token to user's  session
        public IHttpActionResult SetBookmark([FromBody] GitRepository token)
        {
            try
            {
                //check if bookmarks dictionary exist if not create one
                if (!(HttpContext.Current.Session[_sessinKey] is Dictionary<int, GitRepository> bookmarks))
                {
                    bookmarks = new Dictionary<int, GitRepository>();
                }
                
                bookmarks[token.id] = token;

                HttpContext.Current.Session[_sessinKey] = bookmarks;

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        //get user's bookmarks that were stored in session
        public IHttpActionResult GetBookmark()
        {
            try
            {
                if ((HttpContext.Current.Session["bookmarks"] is Dictionary<int, GitRepository> bookmarks))
                {
                    List<GitRepository> list = bookmarks.Values.ToList();
                    
                    return Ok(list);
                }

                //if there are no bookmarks return empty list
                return Ok(new List<GitRepository>());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
