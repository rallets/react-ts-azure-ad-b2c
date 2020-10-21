using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace React_AD_B2C_WebApi.Models
{
    public enum EItemsSearchType
    {
        Metadata = 1,
        Tags
    }

    public class ValidTextRequest
    {
        [Required]
        public string Text { get; set; }
    }

    public class ItemsSearchRequest
    {
        [Required]
        public string Text { get; set; }
        [Required]
        public EItemsSearchType Type { get; set; }
    }

    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Tag> Tags { get; set; }
    }

    public class ItemBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class ItemResponse : ItemBase
    {
        public string Description { get; set; }
        public List<Tag> Tags { get; set; }
    }

    public class ItemHeaderResponse : ItemBase
    {
        public int NumTags { get; set; }
    }

    public class ItemEditRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ItemTagEditRequest> Tags { get; set; }
    }

    public class ItemTagEditRequest
    {
        public Guid? Id { get; set; }
        [Required]
        public string Name { get; set; }
    }

    public static class ItemMapper
    {
        public static ItemHeaderResponse ToHeaderApiModel(this Item item)
        {
            return new ItemHeaderResponse
            {
                Id = item.Id,
                Name = item.Name,
                NumTags = item.Tags?.Count ?? 0,
            };
        }

        public static ItemResponse ToApiModel(this Item item)
        {
            return item == null ? null : new ItemResponse
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Tags = item.Tags ?? new List<Tag>(),
            };
        }

        public static IEnumerable<ItemResponse> ToApiModel(this IEnumerable<Item> item) => item?.Select(g => g.ToApiModel());

        public static Item ToModel(this ItemEditRequest request, Item existingRecord)
        {
            return request == null
                ? null
                : new Item
                {
                    Id = existingRecord?.Id ?? Guid.NewGuid(),
                    Name = request.Name,
                    Description = request.Description,
                    Tags = request.Tags?.Select(x => new Tag
                    {
                        Id = x.Id == null ? Guid.NewGuid() : (Guid)x.Id,
                        Name = x.Name
                    }).ToList(),
                };
        }
    }
}
