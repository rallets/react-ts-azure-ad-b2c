using React_AD_B2C_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace React_AD_B2C_WebApi.Services
{
    public interface IItemsService
    {
        IEnumerable<Item> GetAll();
        Item Exists(Guid id);
        Item Edit(Item item, ItemEditRequest request);
        Item Create(ItemEditRequest request);
        bool Delete(Guid id);
        IEnumerable<Item> SearchInMetadata(string text);
        IEnumerable<Item> SearchInTags(string text);
    }

    public class ItemsService : IItemsService
    {
        private readonly Dictionary<Guid, Item> _items = new Dictionary<Guid, Item>();

        public ItemsService()
        {
            if (_items.Count == 0)
            {
                Create(new ItemEditRequest { Name = "Name", Description = "Description", Tags = new List<ItemTagEditRequest> { new ItemTagEditRequest { Id = Guid.NewGuid(), Name = "Tag1" } } });
                Create(new ItemEditRequest { Name = "Name", Description = "Description", Tags = new List<ItemTagEditRequest> { new ItemTagEditRequest { Id = Guid.NewGuid(), Name = "Tag2" } } });
                Create(new ItemEditRequest { Name = "Name", Description = "Description", Tags = new List<ItemTagEditRequest> { new ItemTagEditRequest { Id = Guid.NewGuid(), Name = "Tag3" } } });
            }
        }

        public IEnumerable<Item> GetAll()
        {
            return _items.Select(x => x.Value);
        }

        public Item Exists(Guid id)
        {
            _items.TryGetValue(id, out var item);
            return item;
        }

        public Item Edit(Item item, ItemEditRequest request)
        {
            var entity = request.ToModel(item);
            _items[item.Id] = entity;
            return entity;
        }

        public Item Create(ItemEditRequest request)
        {
            var entity = request.ToModel(null);
            _items.Add(entity.Id, entity);
            return entity;
        }

        public bool Delete(Guid id)
        {
            _items.Remove(id);
            return true;
        }

        public IEnumerable<Item> SearchInMetadata(string text)
        {
            var result = _items.Where(x =>
                    x.Value.Name.Contains(text, StringComparison.InvariantCultureIgnoreCase) ||
                    x.Value.Description.Contains(text, StringComparison.InvariantCultureIgnoreCase))
                .Select(x => x.Value);
            return result;
        }

        public IEnumerable<Item> SearchInTags(string text)
        {
            var result = _items
                .Where(x =>
                    x.Value.Tags.Select(tag => tag.Name).Any(name =>
                        name.Contains(text, StringComparison.InvariantCultureIgnoreCase)
                    )
                )
                .Select(x => x.Value);
            return result;
        }
    }
}
