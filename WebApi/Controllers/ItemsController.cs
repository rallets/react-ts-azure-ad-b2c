using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using React_AD_B2C_WebApi.Models;
using React_AD_B2C_WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace React_AD_B2C_WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly IItemsService _itemsService;

        public ItemsController(
            ILogger<ItemsController> logger,
            IItemsService itemsService
            )
        {
            _logger = logger;
            _itemsService = itemsService;
        }

        [HttpGet]
        public ActionResult<List<ItemHeaderResponse>> Get()
        {
            var result = _itemsService
                .GetAll()
                .Select(x => x.ToHeaderApiModel())
                .ToList();
            return result;
        }

        [HttpGet("{id:guid}")]
        public ActionResult<ItemResponse> GetItem(Guid id)
        {
            var item = _itemsService.Exists(id);
            if (item == null)
            {
                return NotFound();
            }

            var result = item.ToApiModel();
            return result;
        }

        [HttpPut("{id:guid}")]
        public ActionResult<ItemResponse> EditItem(Guid id, ItemEditRequest request)
        {
            var item = _itemsService.Exists(id);
            if (item == null)
            {
                return NotFound();
            }

            var result = _itemsService.Edit(item, request);
            var response = result.ToApiModel();
            return response;
        }

        [HttpPost]
        public ActionResult<ItemResponse> CreateItem(ItemEditRequest request)
        {
            var result = _itemsService.Create(request);
            var response = result.ToApiModel();
            return response;
        }

        [HttpDelete("{id:guid}")]
        public ActionResult<bool> DeleteItem(Guid id)
        {
            var item = _itemsService.Exists(id);
            if (item == null)
            {
                return NotFound();
            }

            var result = _itemsService.Delete(id);
            return result;
        }

        /// <summary>
        /// Just a dummy validate endpoint to implement an async form validator
        /// </summary>
        [HttpPost("valid-text")]
        public ActionResult<bool> GettIsValidText([FromBody] ValidTextRequest request)
        {
            // < & > are invalid char, as they can be used to build an HTML tag
            var containInvalidChars = request.Text.IndexOfAny("<>".ToCharArray()) != -1;
            return !containInvalidChars;
        }

        [HttpPost("search")]
        public ActionResult<List<ItemHeaderResponse>> Search([FromBody] ItemsSearchRequest request)
        {
            IEnumerable<Item> result = request.Type switch
            {
                EItemsSearchType.Metadata => _itemsService.SearchInMetadata(request.Text),
                EItemsSearchType.Tags => _itemsService.SearchInTags(request.Text),
                _ => throw new NotImplementedException(),
            };

            var response = result
                .Select(x => x.ToHeaderApiModel())
                .ToList();
            return response;
        }
    }

}
