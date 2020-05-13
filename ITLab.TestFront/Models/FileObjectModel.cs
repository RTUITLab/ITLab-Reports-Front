﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class FileObjectModel
    {
        public string Id { get; set; }
        public int Length { get; set; }
        public int ChunkSize { get; set; }
        public DateTime UploadDate { get; set; }
        public string Filename { get; set; }
        public Dictionary<string, string> Metadata { get; set; }
    }
}