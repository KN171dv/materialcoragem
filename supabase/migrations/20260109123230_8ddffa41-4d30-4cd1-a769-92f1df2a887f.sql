-- Create storage bucket for orcamentos
INSERT INTO storage.buckets (id, name, public)
VALUES ('orcamentos', 'orcamentos', true);

-- Allow anyone to upload files to the orcamentos bucket
CREATE POLICY "Allow public uploads to orcamentos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'orcamentos');

-- Allow anyone to read files from the orcamentos bucket
CREATE POLICY "Allow public read access to orcamentos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'orcamentos');